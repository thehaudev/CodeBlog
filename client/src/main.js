import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {registerGlobalComponent} from './utils/import'
import store from './stores/index'
import './assets/styles/reset.css'
const user = JSON.parse(localStorage.getItem('user'));
if (user) {
    store.commit('auth/setUser', user);
}
const app = createApp(App)
registerGlobalComponent(app)
app.use(router)
app.use(store)
app.mount('#app')
