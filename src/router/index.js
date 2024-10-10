import { createRouter, createWebHistory } from 'vue-router'
import { baseRoute } from './baseRoute'
import { menuRoute } from './menuRoute'
import { initPermission } from './permission'
import Layout from '../layout/index.vue'

const routes = [
  ...baseRoute,
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    component: Layout,
    meta: { title: '布局' },
    children: [
      ...menuRoute
    ],
  },
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

initPermission(router)

export default router
