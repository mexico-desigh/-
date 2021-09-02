import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About/About.vue')
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import('../views/Article/Article.vue')
  },
  {
    path: '/link',
    name: 'Link',
    component: () => import('../views/Link/Link.vue')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../views/Message/Message.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User/User.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
