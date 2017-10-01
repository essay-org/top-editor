<template>
  <top-editor v-model="content" :options="options" :zIndex="zIndex" :upload="uploadImg"></top-editor>
</template>
<script>
import content from '../README.md'
export default {
  data() {
    return {
      content: '',
      options: {
        linkify: true
      },
      zIndex: 999,
      uploadImg: {
        url: 'http://localhost:8080/api/upload'
      }
    }
  }
}
</script>