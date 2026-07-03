/**
 * Service slug list shared between the runtime constant set
 * (`constants/servicePages.ts`) and the SSG prerender pipeline
 * (`vite.config.ts:includedRoutes`).
 */
export const SERVICE_SLUGS = [
  'video-photo-editing',
  'graphics-design',
  'web-apps-systems',
  'business-consultation',
  'social-media-management',
] as const

export type ServiceSlug = (typeof SERVICE_SLUGS)[number]
