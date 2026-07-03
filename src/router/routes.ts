import type { RouteRecordRaw } from 'vue-router'

/**
 * Route table shared between the SPA bootstrap and the vite-ssg prerender
 * pipeline. Keeping this in its own module lets the SSG entry import it
 * without dragging in the router instance (which vite-ssg constructs itself).
 */
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/services/web-app-development',
    redirect: '/services/web-apps-systems',
  },
  {
    path: '/services/system-design',
    redirect: '/services/business-consultation',
  },
  {
    path: '/services/:slug',
    name: 'service',
    component: () => import('@/views/ServiceView.vue'),
  },
  {
    path: '/get-started',
    name: 'get-started',
    component: () => import('@/views/GetStartedView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

/**
 * Hash-target scroll helper shared by both bootstrap paths. Waits up to ~200ms
 * for the hash target to mount before resolving — needed when async sections
 * mount after the route resolves.
 */
export const waitForHashTarget = (hash: string): Promise<HTMLElement | null> =>
  new Promise((resolve) => {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      resolve(null)
      return
    }
    let attempts = 0
    const find = () => {
      const target = document.querySelector<HTMLElement>(hash)
      if (target || attempts >= 12) {
        resolve(target)
        return
      }
      attempts += 1
      window.requestAnimationFrame(find)
    }
    window.requestAnimationFrame(find)
  })
