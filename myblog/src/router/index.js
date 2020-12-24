import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Article = () => import('../views/article/Article')
const Admin = () => import('../views/admin/Admin')
const Login = () => import('../views/login/Login')

const routes = [
  {
    path: '',
    redirect: '/article',
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/admin',
    component: Admin
  },
  {
    path: '/article',
    component: Article
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
