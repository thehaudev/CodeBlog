import { createApp ,ref, computed} from 'vue'
import { useStore } from "vuex";
import App from './App.vue'
import router from './router'
import {registerGlobalComponent} from './utils/import'
import store from './stores/index'
import './assets/styles/reset.css'
import './assets/styles/input.css'
const user = JSON.parse(localStorage.getItem('user'));
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
if (user) {
    store.commit('auth/setUser', user);
}
const app = createApp(App)
registerGlobalComponent(app)
app.component('QuillEditor', QuillEditor)
app.use(router)
app.use(store);
(async function () {
  await store.dispatch("posts/fetchData");
})();
app.mount('#app')
