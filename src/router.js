import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from './pages/HomePage.vue'
import ErrorPage from './pages/ErrorPage.vue'
import TestDetailsPage from './pages/TestDetailsPage.vue'

Vue.use(VueRouter)

const routes =
[
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/tests/:testId',
        name: 'TestDetails',
        component: TestDetailsPage
    },
    {
        path: '*',
        component: ErrorPage,
        name: 'Error'
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
  
  export default router