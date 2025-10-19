import { createWebHistory, createRouter } from 'vue-router'
import { routes } from '../config/routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _, next) => {
  const title = to.meta.title ?? to.name

  document.title = title as string
  next()
})

export default router
