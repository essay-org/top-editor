<template>
	<div class="top-editor">
		<div class="editor-wrap">
			<!-- 菜单栏 -->
			<div class="editor-menu">
				<div class="menu-group-left">
					<i class="icon iconfont icon-bold" title="hello"></i>
					<i class="icon iconfont icon-italic"></i>
					<i class="icon iconfont icon-underline"></i>
					<i class="icon iconfont icon-strike"></i>
					<i class="icon iconfont icon-link"></i>
					<i class="icon iconfont icon-code"></i>
					<i class="icon iconfont icon-image"></i>
					<i class="icon iconfont icon-undo"></i>
					<i class="icon iconfont icon-redo"></i>
					<i class="icon iconfont icon-preview"></i>
					<i class="icon iconfont icon-query"></i>
				</div>
				<div class="menu-group-right">
					<i class="icon iconfont icon-fullscreen"></i>
				</div>
			</div>
			<!-- 内容区 -->
			<div class="editor-content">
				<textarea class="content-editor" v-model="content"></textarea>
				<div class="content-preview" v-html="html"></div>
			</div>
		</div>
	</div>
</template>
<script>
import markdownIt from 'markdown-it'
import hljs from 'highlight.js' 

	export default {
		name: 'TopEditor',
		props:['value','options','upload','zIndex','height'],
		data () {
			return {
				content: '',
				html:'',
				history: [],
				uploadOpt: {
	        name: 'file',
	        accept: 'image/jpg,image/jpeg,image/png',
	        url: 0,
	        header: {}
				},
			}
		},
		created() {
			this.uploadOpt = { ...this.uploadOpt, ...this.upload }
			console.log(this.uploadOpt)
			// this.value接收v-model中的值
    	this.content = this.value
    	// 保存一条历史记录
    	this.history.push(this.content)
			// 初始化markdownit配置
			this.initMarkdown()
		},
		 watch: {
	    content () {
	      this.renderIt()
	    },
	    // 配置文件变化后重新初始化
	    options: {
	      deep: true,
	      handler () {
	        this.initMarkdown()
	      }
	    }
	  },
		computed: {
			compileMarkdown () {
				return 'good'
			}
		},
		methods: {
			// 初始化配置文件
	    initMarkdown () {
	      // 可在这里配置默认项
	      let options = {
	        html: true,
	        breaks: true,
	        ...this.options
	      }
	      this.markdownit = markdownIt(options)
	      this.renderIt()
	    },
	    renderIt () {
      	this.html = this.markdownit.render(this.content)
	      this.$nextTick(() => {
	        this.$el.querySelectorAll('a').forEach((a) => {
	          a.setAttribute('target', '_blank')
	        })
	      })
    	},
		}
	}
</script>
<style lang="scss">
	@import './iconfont/iconfont.css';
	* {
		padding:0;
		margin:0;
		box-sizing: border-box;
	}
	html,body {
		font-family: "Microsoft Yahei", "Hiragino Sans GB", "Helvetica Neue", Helvetica, tahoma, arial, Verdana, sans-serif, "WenQuanYi Micro Hei", "\5B8B\4F53";
	}
	.top-editor {
		width: 100%;
		height: 100%;
		border:1px solid #ccc;
		.editor-wrap {
			.editor-menu {	
				border-bottom: 1px solid #ccc;
				display: flex;
				overflow-x: auto;
				justify-content: space-between;
				padding-left:5px;
				padding-right: 5px;
				.icon {
					display: inline-block;
					padding:10px 8px;
					font-size: 18px;
					color: #A9A9A9;
					flex:1;
					cursor: pointer;
				}
			}
			.editor-content {
				height:500px;
				display: flex;
				.content-editor {
					font-size: 16px;
					border:0;
					border-right:1px solid #ccc;
					flex:1;
					resize:none;
					background-color: #f1f1f1;
					padding:15px;
					outline: none;
					
				}
				.content-preview {
					width:50%;
					padding:15px;
				}
			}
		}
	}
</style>