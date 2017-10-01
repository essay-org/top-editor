import TopEditor from './TopEditor.vue'
const editor = {
	install: function(Vue) {
		Vue.component(TopEditor.name, TopEditor)
	} 
}

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(editor)
}
export default editor
export { TopEditor }