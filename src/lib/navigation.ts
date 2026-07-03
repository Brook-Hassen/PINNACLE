import type { RouteLocationNormalizedLoaded, RouteLocationRaw } from 'vue-router'
import type { NavLink } from '@/types'

export const HOME_SECTION_IDS = new Set(['home', 'services', 'work', 'team'])

export const isHomeSectionLink = (to: string): boolean => to.startsWith('/#')

export const homeSectionTarget = (sectionId: string): RouteLocationRaw => ({
  name: 'home',
  hash: `#${sectionId}`,
})

export const navTargetFor = (link: NavLink): RouteLocationRaw => {
  if (!isHomeSectionLink(link.to)) return link.to

  return homeSectionTarget(link.to.slice(2))
}

export const HOME_SCROLL_SECTIONS = ['home', 'services', 'work', 'team'] as const

export type HomeScrollSectionId = (typeof HOME_SCROLL_SECTIONS)[number]

export interface ResolveActiveHomeSectionOptions {
  scrollY: number
  headerOffset?: number
  sectionTriggerOffset?: number
  getElementById?: (id: string) => HTMLElement | null
}

/** Pick the home-page section whose top has passed the sticky-header trigger line. */
export function resolveActiveHomeSection(
  options: ResolveActiveHomeSectionOptions,
): HomeScrollSectionId {
  const {
    scrollY,
    headerOffset = 88,
    sectionTriggerOffset = 32,
    getElementById = (id) =>
      typeof document !== 'undefined' ? document.getElementById(id) : null,
  } = options

  const marker = scrollY + headerOffset + sectionTriggerOffset
  let current: HomeScrollSectionId = 'home'

  for (const id of HOME_SCROLL_SECTIONS) {
    const el = getElementById(id)
    if (!el) continue

    const sectionTop = el.getBoundingClientRect().top + scrollY
    if (sectionTop <= marker) {
      current = id
    }
  }

  return current
}

export const isNavLinkActive = (link: NavLink, route: RouteLocationNormalizedLoaded): boolean => {
  if (link.to === '/') {
    return route.name === 'home' && !route.hash
  }

  if (isHomeSectionLink(link.to)) {
    return route.name === 'home' && route.hash === link.to.slice(1)
  }

  return route.path === link.to
}
