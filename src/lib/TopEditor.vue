<template>
  <div class="top-editor" :style="{zIndex:zIndex, height:realHeight || '50vh'}" :class="{'full-screen':isFullScreen}">
    <div class="editor-wrap">
      <!-- 菜单栏 -->
      <div class="editor-menu">
        <div class="menu-group-left">
          <i class="icon iconfont icon-bold" title="加粗 &lt;strong&gt; Ctrl+b" @click="doCode('**')" hotkey="Ctrl+b"></i>
          <i class="icon iconfont icon-italic" title="斜体 &lt;em&gt; Ctrl+i" @click="doCode('*')" hotkey="Ctrl+i"></i>
          <i class="icon iconfont icon-underline" title="下划线 &lt;u&gt; Ctrl+u" @click="doAction('&lt;u&gt;&lt;/u&gt;', -4)" hotkey="Ctrl+u"></i>
          <i class="icon iconfont icon-strike" title="中划线 &lt;s&gt; Ctrl+d" @click="doCode('~~')" hotkey="Ctrl+d"></i>
          <i class="icon iconfont icon-link" title="超链接 &lt;a&gt; Ctrl+l" @click="doAction('[name]()', -1)" hotkey="Ctrl+l"></i>
          <i class="icon iconfont icon-code" title="代码 &lt;code&gt; Ctrl+`" @click="addCode" hotkey="Ctrl+`"></i>
          <i class="icon iconfont icon-image" title="图片 &lt;img&gt; Ctrl+g" hotkey="Ctrl+g"></i>
          <i class="icon iconfont icon-undo" title="撤销 Ctrl+z" hotkey="Ctrl+z"></i>
          <i class="icon iconfont icon-redo" title="恢复 Ctrl+y" hotkey="Ctrl+y"></i>
          <i class="icon iconfont icon-preview"></i>
          <i class="icon iconfont icon-query"></i>
        </div>
        <div class="menu-group-right">
          <i class="icon iconfont icon-fullscreen" @click="isFullScreen = !isFullScreen"></i>
        </div>
      </div>
      <!-- 内容区 -->
      <div class="editor-content">
        <div class="content-wrap">
          <!-- 编辑区 -->
          <textarea class="content-editor" v-model="content" @scroll="scrollReset" @keydown="keydown" ref="editor"></textarea>
          <!-- 预览区 -->
          <div class="content-preview markdown-body" v-html="html" ref="preview"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import markdownIt from 'markdown-it'
import hljs from 'highlightjs'
// 选中内容的位置
function getEditorSelection(editor) {
  return {
    start: editor.selectionStart,
    end: editor.selectionEnd
  }
}
// 设置选中区域
function setEditorRange(editor, start, length = 0) {
  editor.setSelectionRange(start, start + length)
  editor.focus()
}
export default {
  name: 'TopEditor',
  props: ['value', 'options', 'upload', 'zIndex', 'height'],
  data() {
    return {
      content: '',
      html: '',
      history: [],
      uploadOpt: {
        name: 'file',
        accept: 'image/jpg,image/jpeg,image/png',
        url: 0,
        header: {}
      },
      isFullScreen: false
    }
  },
  created() {
    this.uploadOpt = { ...this.uploadOpt, ...this.upload }
    // console.log(this.uploadOpt)
    // this.value接收v-model中的值
    this.content = this.value
    // 保存一条历史记录
    this.history.push(this.content)
    // 初始化markdownit配置
    this.initMarkdown()
  },
  watch: {
    content() {
      this.renderIt()
      this.scrollReset()
    },
    // 配置文件变化后重新初始化
    options: {
      deep: true,
      handler() {
        this.initMarkdown()
      }
    },
  },
  computed: {
    realHeight() {
      if (this.isFullScreen) return '100%'
      return this.height
    }
  },
  methods: {
    // 初始化配置文件
    initMarkdown() {
      // 可在这里配置默认项
      let options = {
        html: true,
        breaks: true,
        highlight(str, lang) {
          lang = lang || 'javascript'
          if (hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(lang, str).value
            } catch (__) {}
          }
          return ''
        },
        ...this.options
      }
      this.markdownit = markdownIt(options)
      this.renderIt()
    },
    renderIt() {
      this.html = this.markdownit.render(this.content)
      this.$nextTick(() => {
        this.$el.querySelectorAll('a').forEach((a) => {
          a.setAttribute('target', '_blank')
        })
      })
    },
    scrollReset() {
      let editor = this.$refs.editor
      let scrollHeight = (editor.scrollHeight - editor.clientHeight) || editor.scrollHeight
      // 获得被卷去的比例
      let scroll = editor.scrollTop / scrollHeight
      let preview = this.$refs.preview
      // 设置预览区被卷去的头部
      let preTop = (preview.scrollHeight - preview.clientHeight) * scroll
      preview.scrollTop = preTop
    },
    // 快捷键配置
    keydown(e) {
      let code = e.key
      if (e.ctrlKey === true) {
        let hotkey = 'Ctrl+' + code
        // console.log(hotkey)
        let el = this.$el.querySelector(`[hotkey='${hotkey}']`)
        if (el) {
          e.preventDefault()
          el.click()
        }
      } else if (code === 'Tab') {
        e.preventDefault()
        const TAB_SPACE = '  '
        let editor = this.$refs.editor
        let { start, end } = getEditorSelection(editor)
        let { before, select, after } = this.selectedStr(start, end)
        if (select.indexOf('\n') > -1) {
          // 一共10行，选中了5-6行中某段，beforeLR表示1-4行
          let beforeLR = before.substr(0, before.lastIndexOf('\n') + 1)
          // afterLR表示5行前未选中部分
          let afterLR = before.substr(beforeLR.length)
          before = beforeLR
          // 5行开头到选中文本末尾
          select = afterLR + select
          let lines = select.split('\n')
          if (e.shiftKey) {
            lines = lines.map(l => l.substr(0, TAB_SPACE.length).replace(/(^\s*)/g, '') + l.substr(TAB_SPACE.length))
          } else {
            lines = lines.map(l => TAB_SPACE + l)
          }
          let newInsert = lines.join('\n')
          this.content = before + newInsert + after
          this.$nextTick(() => {
            setEditorRange(editor, before.length, newInsert.length)
          })
        } else {
          // 单行缩进
          this.insertTo(TAB_SPACE, start)
        }
      }
    },
    doCode(code) {
      this.insertBetween(code, code)
    },
    // doAction('[name]()',-1)   insertBetween('[name](',')')
    doAction(action, relativeEnd = 0) {
      relativeEnd = action.length + relativeEnd
      let actionBefore = action.substr(0, relativeEnd)
      let actionAfter = action.substr(relativeEnd)
      this.insertBetween(actionBefore, actionAfter)
    },
    addCode() {
      let select = this.getSelectStr()
      if (select.indexOf('\n') > -1) {
        this.insertBetween('```\n', '\n```')
      } else {
        this.doCode('`')
      }
    },
    insertTo(text, position = getEditorSelection(this.$refs.editor).start) {
      let before = this.content.substr(0, position)
      let after = this.content.substr(position)
      this.content = before + text + after
      this.$nextTick(() => {
        setEditorRange(this.$refs.editor, position + text.length)
      })
    },
    insertBetween(actionBefore, actionAfter) {
      let editor = this.$refs.editor
      // 选中内容后，插入标记
      let { start, end } = getEditorSelection(editor)
      // 选中前，已选中，选中后的文本
      let { before, select, after } = this.selectedStr(start, end)
      // 内容拼接
      let newInsert = actionBefore + select + actionAfter
      // 插入内容
      this.content = before + newInsert + after
      // 选中内容获取焦点，可以重置光标
      this.$nextTick(() => {
        setEditorRange(editor, start + actionBefore.length, select.length)
      })
    },
    // 获取选中的文本
    getSelectStr() {
      let editor = this.$refs.editor
      let { start, end } = getEditorSelection(editor)
      let { select } = this.selectedStr(start, end)
      return select
    },
    selectedStr(start, end) {
      // 选中文本前的文本
      let before = this.content.substr(0, start)
      // 选中的文本
      let select = this.content.substr(start, end - start)
      // 选中后的文本
      let after = this.content.substr(end, this.content.length)
      return { before, select, after }
    }
  }
}
</script>
<style lang="scss">
@import '~highlightjs/styles/github.css';
@import './iconfont/iconfont.css';
@import "./styles/github-markdown.css";
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html,
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.top-editor {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  &.full-screen {
    position: fixed;
    top: 0;
    left: 0;
  }
  .editor-wrap {
    position: relative;
    height: 100%;
    display: flex;
    // 上下排列
    flex-direction: column;
    .editor-menu {
      width: 100%;
      display: flex;
      justify-content: space-between;
      overflow-x: auto;
      padding-left: 5px;
      padding-right: 5px;
      border-bottom: 1px solid #ccc;
      .icon {
        display: inline-block;
        padding: 10px 8px;
        font-size: 18px;
        color: #A9A9A9;
        cursor: pointer;
      }
    }
    .editor-content {
      position: relative;
      flex: 1;
      .content-wrap {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
	      .content-editor {
	        font-size: 14px;
	        line-height: 24px;
	        border: 0;
	        border-right: 1px solid #ccc;
	        width: 50%;
	        resize: none;
	        background-color: #f8f8f8;
	        padding: 15px;
	        outline: none;
	        overflow: auto;
	      }
	      .content-preview {
	        width: 50%;
	        padding: 15px;
	        overflow: auto;
	      }
      }
    }
  }
}
</style>