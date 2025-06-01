import { createWebHistory, createRouter } from 'vue-router'
import { routes } from '../config/routes'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _, next) => {
  document.title = to.name as string
  next()
})

export default router
