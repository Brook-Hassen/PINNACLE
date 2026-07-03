import type { Directive, DirectiveBinding } from 'vue'

/**
 * `v-reveal` — safe, one-time scroll-entrance directive.
 *
 * SAFETY MODEL (this is the important part):
 *  - The hidden pre-reveal state lives entirely in CSS keyed on the
 *    `[data-reveal]` attribute, which this directive adds ONLY:
 *      • in the browser (mounted runs client-side only),
 *      • when the user has NOT requested reduced motion,
 *      • and ONLY to elements that are currently below the fold.
 *    Consequence: server-rendered HTML, no-JS, reduced-motion, and anything
 *    already on screen at load are NEVER hidden — content is always present and
 *    visible by default. There is no FOUC and no SEO/no-JS risk.
 *  - It never touches the router, scroll position, history, hash handling, or
 *    scrollBehavior. It only sets an attribute and runs an IntersectionObserver.
 *  - Reveals fire once per cycle, then the observer disconnects.
 *
 * Options (binding value, all optional):
 *   { delay?: number }       stagger delay in ms (applied via --reveal-delay)
 *   { blur?: boolean }       add a subtle blur-to-sharp (use for headings/text only)
 *   { cycleKey?: number }    when this changes, reveal state resets and reinitializes
 */

export interface RevealOptions {
  delay?: number
  blur?: boolean
  cycleKey?: number
}

interface RevealEl extends HTMLElement {
  __revealObserver__?: IntersectionObserver
  __revealCycleKey__?: number
}

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const clearReveal = (el: RevealEl): void => {
  el.__revealObserver__?.disconnect()
  el.__revealObserver__ = undefined
  el.classList.remove('is-revealed')
  el.removeAttribute('data-reveal')
  el.removeAttribute('data-reveal-blur')
  el.style.removeProperty('--reveal-delay')
}

const initReveal = (el: RevealEl, binding: DirectiveBinding<RevealOptions | undefined>): void => {
  if (typeof window === 'undefined') return
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return

  clearReveal(el)

  const cycleKey = binding.value?.cycleKey ?? 0
  el.__revealCycleKey__ = cycleKey

  const start = (): void => {
    // Only animate content the user has to scroll TO. Anything already in view
    // (or already scrolled past) at mount stays visible — no hide, no flash.
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.92) return

    const delay = binding.value?.delay ?? 0
    if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`)
    el.setAttribute('data-reveal', '')
    if (binding.value?.blur) el.setAttribute('data-reveal-blur', '')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          el.classList.add('is-revealed')
          observer.disconnect()
          el.__revealObserver__ = undefined
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' },
    )
    observer.observe(el)
    el.__revealObserver__ = observer
  }

  // Defer measurement until after route scroll resets and layout settles.
  requestAnimationFrame(() => requestAnimationFrame(start))
}

export const vReveal: Directive<RevealEl, RevealOptions | undefined> = {
  mounted(el, binding) {
    initReveal(el, binding)
  },

  updated(el, binding) {
    const nextKey = binding.value?.cycleKey ?? 0
    if (el.__revealCycleKey__ !== nextKey) {
      initReveal(el, binding)
    }
  },

  unmounted(el) {
    clearReveal(el)
  },
}
