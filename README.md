## 功能介绍

1. 支持图片上传(允许跨域)
2. 支持实时预览和全屏模式
3. 支持通过粘贴键，上传qq截图
4. 支持快捷键操作，例如撤销，恢复，缩进

## 安装

```node
npm i top-editor highlight.js markdown-it -S
```

## 使用

方法一全局引入(推荐)  

```javascript
import TopEditor from 'TopEditor'
Vue.use(TopEditor)
```

### 在组件中加载编辑器  

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
        // 如果需要上传图片，在这里填写url
        // top-editor向该地址发送post请求，上传成功后后台需返回一个src地址  
        url: 'http://127.0.0.1:8080/v1/upload',
        headers: {
          token: 'token value'
        }
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
  /* 高亮风格可自己配置 */
  @import '~highlight.js/styles/github.css';
</style>
```

### 在前台显示渲染后的文本

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

**说明**：为了减小包的体积，没把highlight.js和markdown-it集成到top-editor    

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

事件：

| 类型 | 说明 | 返回值 |
| --- | --- | --- |
| save | 当ctrl+s时执行 | true |

<a id="upload"></a>

### upload配置项

```javascript
{
  // 图片上传api地址，需返回一个图片地址，如'https://test.com/static/a.jpg'
  url: false,
  // 如果需要认证在这里可配置
  headers: {
    token: 'token value'
  }
}
```

## 查看演示和贡献代码

```bash
git clone https://github.com/vuetop/top-editor.git
npm i vue markdown-it highlight.js

# 修改webpack.config.js
# npm run build时打包文件
entry: './src/lib/index.js',

# npm run dev时查看演示
entry: './src/main.js',
```

## 效果图

![top-editor](https://github.com/vuetop/top-editor/blob/master/demo/top-editor.png)  

## 开源协议

MIT