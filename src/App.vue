<template>
  <top-editor v-model="content" :options="options" :height="height" :zIndex="zIndex" :upload="uploadImg"></top-editor>
</template>
<script>
// import 'highlightjs/styles/github.css'
export default {
  data() {
    return {
      content: '>hello \n ```javascript\nfunction(){\nalert(1)}\n```',
      options: {
        quotes: '“”‘’',
        typographer: true,
        linkify: true
      },
      height: '70vh',
      zIndex: 999,
      uploadImg: {
        // defualt form upload name
        name: 'file',
        // default upload accept  
        // @like <input type = 'file' accept='image/jpg,image/jpeg,image/png'/>
        accept: 'image/jpg,image/jpeg,image/png',

        // your  file upload url
        //if url == null or other params 'false' the upload button will hidden
        url: null,
        // your upload url
        header: { 'Authorization': 'you code' }
      }
    }
  }
}
</script>