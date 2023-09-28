import Vue from 'vue'
import App from './app'
import VueRouter from 'vue-router'

Vue.config.productionTip = false


const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes: []
})
new Vue({
    ...App,
    router,
}).$mount('#app')
