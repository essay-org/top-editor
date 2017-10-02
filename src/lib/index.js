import TopEditor from './TopEditor.vue'
import TopPreview from './TopPreview.vue'
const version = '0.0.3'
const components  = [TopEditor, TopPreview]
const install = function(Vue) {
  if (install.installed) return;

  components.forEach(component => {
    Vue.component(component.name, component);
  })
}

if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue)
}

export {
	TopEditor, 
	TopPreview 
}
export default {
	install,
  version
}