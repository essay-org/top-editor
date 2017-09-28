import Vue from 'vue'
import App from './App.vue'
import TopEditor from './lib/index.js'
Vue.use(TopEditor)
new Vue({
  el: '#app',
  render: h => h(App)
})
