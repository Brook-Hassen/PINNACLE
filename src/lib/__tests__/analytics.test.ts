import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

import { trackEvent } from '@/lib/analytics'

declare global {
  interface Window {
    plausible?: ((event: string, options?: { props?: Record<string, string | number | boolean> }) => void) & {
      q?: unknown[]
    }
  }
}

describe('trackEvent', () => {
  beforeEach(() => {
    // happy-dom provides window; reset between tests.
    delete window.plausible
  })

  afterEach(() => {
    delete window.plausible
  })

  it('no-ops silently when window.plausible is undefined', () => {
    // The contract: trackEvent must NEVER throw if analytics has not loaded.
    expect(() => trackEvent('Contact form submit')).not.toThrow()
  })

  it('forwards event names to window.plausible when available', () => {
    const spy = vi.fn()
    window.plausible = spy as unknown as Window['plausible']
    trackEvent('Contact form submit')
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith('Contact form submit', undefined)
  })

  it('wraps custom props in the { props } shape Plausible expects', () => {
    const spy = vi.fn()
    window.plausible = spy as unknown as Window['plausible']
    trackEvent('Contact form error', { reason: 'spam check failed' })
    expect(spy).toHaveBeenCalledWith('Contact form error', {
      props: { reason: 'spam check failed' },
    })
  })
})
