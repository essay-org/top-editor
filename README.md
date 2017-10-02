## 功能介绍
1. 支持图片上传(允许跨域),自动插入后台返回的url 
2. 支持实时预览和全屏模式
3. 支持通过粘贴键，上传qq截图
4. 支持快捷键操作，例如撤销，恢复，缩进
## 安装
```node
npm i top-editor highlight.js -S
```

## 使用
方法一全局引入(推荐)  
```javascript
import TopEditor from 'TopEditor'
Vue.use(TopEditor)
```

在组件中加载编辑器  
```html
<template>
  <top-editor v-model="content" :options="options" :upload="upload"></top-editor>
</template>
<script>
  // 代码高亮配置
  import hljs from 'highlight.js'
  export default {
    data () {
      upload: {
        // 如果需要上传图片，在这里填写url，需返回一个图片url
        url: false
      },
      // 这里配置请参考markdown-it
      options: {
        linkify: true,
        highlight(str, lang) {
          lang = lang || 'javascript'
          if (hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(lang, str).value
            } catch (__) {}
          }
          return ''
        }
      }
    }
  }
</script>
<style>
  /*高亮风格可自己配置*/
  @import '~highlight.js/styles/github.css';
</style>
```
注：marked解析器可能比markdown-it流行，经测试在渲染速度上markdown-it完胜marked

在前台显示渲染后的文本  
当我们把markdown文本存入数据库后，前台需要显示解析后的html,这也是很简单的
```html
<template>
  <top-preview :content="content" :options="options"></top-preview>
</template>
<script>
  export default {
    data () {
      return {
        // content就是从数据库中获取到的markdown文本
        content: this.$store.state.content,
        options: {
          linkify: true,
          highlight(str, lang) {
            lang = lang || 'javascript'
            if (hljs.getLanguage(lang)) {
              try {
                return hljs.highlight(lang, str).value
              } catch (__) {}
            }
            return ''
          }
        }
      }
    }
  }
</script>
<style>
  @import '~highlight.js/styles/github.css';
</style>
```
注：为了减小包的体积和方便自定义，没把lighlight集成到top-editor

方法二在组件中引入  
```html
<template>
  <top-editor v-model="content" :options="options" :upload="upload"></top-editor>
</template>
<script>
import { TopEditor } from 'top-editor'
import hljs from 'highlight.js'
  export default {
    data () {
      upload: {
        url: false
      },
      options: {
        linkify: true,
        highlight(str, lang) {
          lang = lang || 'javascript'
          if (hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(lang, str).value
            } catch (__) {}
          }
          return ''
        }
      }
    },
    components: {
      TopEditor
    }
  }
</script>
<style>
  @import '~highlight.js/styles/github.css';
</style>
</template>
```

渲染组件引入方法相同  
```html
<template>
  <top-preview :content="content" :options="options"></top-preview>
</template>
<script>
import { TopPreview } from 'top-editor'
  export default {
    data () {
      return {
        content: this.$store.state.content,
        options: {
          linkify: true,
          highlight(str, lang) {
            lang = lang || 'javascript'
            if (hljs.getLanguage(lang)) {
              try {
                return hljs.highlight(lang, str).value
              } catch (__) {}
            }
            return ''
          }
        }
      }
    },
    components: {
      TopPreview
    }
  }
</script>
<style>
  @import '~highlight.js/styles/github.css';
</style>
```

## 配置项说明
属性：

| 参数 | 说明 | 类型 | 默认值 |
| ------- | ------------------- | -------- | ---- |
| preview | 是否开启预览模式    | Boolean  | true |
| v-model | textarea中的值      | String   | null |
| options | markdown-it的配置项 | Object   | [文档](https://github.com/markdown-it/markdown-it) |
| zIndex  | 编辑器的z-index     | number   | 99   |
| height  | 编辑器默认高度      | String   | 70vh |
| upload  | 图片上传配置        | Object   | [详情](#upload) |

<a id="upload"></a>
## upload配置项
```javascript
{
  // 图片上传api地址，需返回一个图片地址，如'https://test.com/static/a.jpg'
  url: false,
  // 如果需要认证在这里可配置
  header: {'token': 'token value'}
}

```

## 开源协议
MIT