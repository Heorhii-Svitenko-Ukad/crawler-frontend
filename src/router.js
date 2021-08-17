import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from './pages/HomePage.vue'
import ErrorPage from './pages/ErrorPage.vue'

Vue.use(VueRouter)

const routes =
[
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/tests/:id',
        name: 'TestResult',
        component: HomePage
    },
    {
        path: '*',
        component: ErrorPage
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
  
  export default router