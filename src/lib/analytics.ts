/**
 * Plausible Analytics integration.
 *
 * No-op when VITE_PLAUSIBLE_DOMAIN is unset, so local dev and previews run
 * untracked unless explicitly opted in. The default Plausible script auto-tracks
 * SPA navigations via pushState — Vue Router uses history mode, so pageviews
 * fire without extra hookup.
 */

const PLAUSIBLE_DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN
const PLAUSIBLE_SRC = 'https://plausible.io/js/script.tagged-events.js'

type PlausibleProps = Record<string, string | number | boolean>
type PlausibleFn = (event: string, options?: { props?: PlausibleProps; callback?: () => void }) => void

declare global {
  interface Window {
    plausible?: PlausibleFn & { q?: unknown[] }
  }
}

let initialized = false

export function initAnalytics(): void {
  if (initialized || !PLAUSIBLE_DOMAIN || typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }
  initialized = true

  // Queue calls until the script attaches.
  if (!window.plausible) {
    const queue: unknown[] = []
    const stub = ((...args: unknown[]) => {
      queue.push(args)
    }) as unknown as PlausibleFn & { q?: unknown[] }
    stub.q = queue
    window.plausible = stub
  }

  const script = document.createElement('script')
  script.src = PLAUSIBLE_SRC
  script.defer = true
  script.setAttribute('data-domain', PLAUSIBLE_DOMAIN)
  document.head.appendChild(script)
}

export function trackEvent(event: string, props?: PlausibleProps): void {
  if (typeof window === 'undefined' || !window.plausible) return
  window.plausible(event, props ? { props } : undefined)
}
