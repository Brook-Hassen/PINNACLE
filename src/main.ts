import { ViteSSG } from 'vite-ssg'
import * as Sentry from '@sentry/vue'

import App from './App.vue'
import { routes, waitForHashTarget } from './router/routes'
import { initAnalytics } from './lib'
import { vReveal } from './lib/reveal'
import './assets/main.css'

/**
 * vite-ssg owns the createApp lifecycle. In `vite dev` it behaves like a
 * regular SPA bootstrap; in `vite-ssg build` it renders every route in the
 * `includedRoutes` list (configured in vite.config.ts) to a static HTML
 * file, then hydrates on the client. @unhead/vue's createHead is installed
 * automatically by vite-ssg — with the server variant during SSG and the
 * client variant in the browser.
 */
export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL,
    scrollBehavior: async (to) => {
      if (to.hash) {
        await waitForHashTarget(to.hash)
        // In-page section navigation stays smooth (with the sticky-header offset).
        return { el: to.hash, behavior: 'smooth', top: 88 }
      }
      // Top-resets (initial load, reload, route change) are INSTANT and
      // deterministic — no animated "settling" toward the hero. Combined with
      // manual scrollRestoration below, a reload lands at the hero cleanly.
      return { top: 0 }
    },
  },
  ({ app, router, isClient }) => {
    // Registered for SSG render + client so templates resolve `v-reveal` in
    // both. Its `mounted` hook is browser-only and only adds an attribute +
    // observer — it never touches routing, scroll, or hydration markup.
    app.directive('reveal', vReveal)

    // Browser-only side effects. SSG renders only the markup; analytics,
    // captcha, and Sentry initialise on hydration.
    if (!isClient) return

    // NOTE: history.scrollRestoration is set to 'manual' by a synchronous inline
    // script in index.html (runs before the browser can restore scroll on
    // reload). Setting it here in this deferred module would be too late.

    const sentryDsn = import.meta.env.VITE_SENTRY_DSN
    if (sentryDsn) {
      Sentry.init({
        app,
        dsn: sentryDsn,
        integrations: [Sentry.browserTracingIntegration({ router })],
        tracesSampleRate: 0.1,
        environment: import.meta.env.MODE,
      })
    }

    initAnalytics()

    // Recover from stale lazy-chunk failures after a deploy. When a build
    // ships new chunk hashes, an open tab will 404 on the next dynamic
    // import; reload picks up the fresh manifest.
    router.onError((err) => {
      const msg = String(err && (err as Error).message) || ''
      if (
        /Failed to fetch dynamically imported module/i.test(msg) ||
        /Loading chunk [\w-]+ failed/i.test(msg) ||
        /Importing a module script failed/i.test(msg)
      ) {
        window.location.reload()
      }
    })
  },
)
