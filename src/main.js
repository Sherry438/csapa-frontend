import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { AxiosHeaders } from 'axios'

// Define a router
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/login', component: () => import('./components/Login.vue') },
        { path: '/order', component: () => import('./components/Order.vue') },

    ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')