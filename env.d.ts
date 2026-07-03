/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_SITE_URL: string
  readonly VITE_TURNSTILE_SITE_KEY: string
  readonly VITE_CONTACT_API_URL: string
  readonly VITE_FORMSPREE_FORM_ID: string
  readonly VITE_PLAUSIBLE_DOMAIN: string
  readonly VITE_SENTRY_DSN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Cloudflare Turnstile global (loaded from external script in GetStartedView)
interface TurnstileRenderOptions {
  sitekey: string
  theme?: 'light' | 'dark' | 'auto'
  size?: 'normal' | 'flexible' | 'compact'
  appearance?: 'always' | 'execute' | 'interaction-only'
  callback?: (token: string) => void
  'error-callback'?: () => void
  'expired-callback'?: () => void
  'timeout-callback'?: () => void
}

interface TurnstileApi {
  render: (container: string | HTMLElement, opts: TurnstileRenderOptions) => string
  reset: (widgetId?: string) => void
  remove: (widgetId?: string) => void
  getResponse: (widgetId?: string) => string | undefined
}

interface Window {
  turnstile?: TurnstileApi
  onPinnacleTurnstileLoad?: () => void
}
