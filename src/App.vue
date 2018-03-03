<template>
  <top-editor v-model="content" :options="options" :zIndex="zIndex" :upload="uploadImg" @save="save"></top-editor>
</template>
<script>
import content from '../README.md'
// 代码高亮
import hljs from 'highlight.js'
export default {
  data() {
    return {
      content: ' ## hello ',
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
        },
      },
      zIndex: 999,
      uploadImg: {
        url: 'http://localhost:8080/v1/upload',
        headers: {
          token: ''
        }
      }
    }
  },
  methods: {
    save(val) {
      console.log(val)
    }
  }
}
</script>
<style>
  @import '~highlight.js/styles/github.css';
</style>