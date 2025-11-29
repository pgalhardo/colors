// router/index.ts

// Composables
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

/**
 * Defines the routes for the application.
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/Workspace.vue'),
  },
  {
    path: '/:catchAll(.*)', // Catch-all route for handling undefined paths
    component: () => import('@/views/NotFound.vue'),
  },
]

/**
 * Creates the router instance for the application.
 */
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
