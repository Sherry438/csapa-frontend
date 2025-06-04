import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { AxiosHeaders } from 'axios'
import { register } from 'swiper/element/bundle'
import 'swiper/css'


// Define a router
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/login', component: () => import('./components/Login.vue') },
        { path: '/order', component: () => import('./components/order.vue') },

    ]
})
register()
const app = createApp(App)
app.use(router)
app.mount('#app')