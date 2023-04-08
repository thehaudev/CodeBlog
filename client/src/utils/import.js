import {defineAsyncComponent}from 'vue'
export function registerGlobalComponent(app){
    app.component('home-layout',defineAsyncComponent(()=> import("@/layouts/home.vue")))
    app.component('default-layout',defineAsyncComponent(()=> import("@/layouts/default.vue")))
}