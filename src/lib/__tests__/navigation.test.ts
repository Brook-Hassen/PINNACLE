import { describe, it, expect } from 'vitest'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

import { isHomeSectionLink, isNavLinkActive, navTargetFor, resolveActiveHomeSection } from '@/lib/navigation'
import type { NavLink } from '@/types'

const route = (
  partial: Partial<RouteLocationNormalizedLoaded>,
): RouteLocationNormalizedLoaded => ({
  name: undefined,
  path: '/',
  hash: '',
  query: {},
  params: {},
  fullPath: '/',
  matched: [],
  meta: {},
  redirectedFrom: undefined,
  ...partial,
}) as RouteLocationNormalizedLoaded

describe('isHomeSectionLink', () => {
  it('matches hash links anchored at the home route', () => {
    expect(isHomeSectionLink('/#services')).toBe(true)
    expect(isHomeSectionLink('/#work')).toBe(true)
  })

  it('rejects standalone paths', () => {
    expect(isHomeSectionLink('/')).toBe(false)
    expect(isHomeSectionLink('/get-started')).toBe(false)
    expect(isHomeSectionLink('/services/brand-identity')).toBe(false)
  })
})

describe('navTargetFor', () => {
  it('rewrites home section links into a named-route target with the hash preserved', () => {
    const link: NavLink = { id: 'services', label: 'Services', to: '/#services' }
    expect(navTargetFor(link)).toEqual({ name: 'home', hash: '#services' })
  })

  it('returns absolute paths unchanged', () => {
    const link: NavLink = { id: 'home', label: 'Home', to: '/' }
    expect(navTargetFor(link)).toBe('/')
  })
})

describe('isNavLinkActive', () => {
  const homeLink: NavLink = { id: 'home', label: 'Home', to: '/' }
  const servicesLink: NavLink = { id: 'services', label: 'Services', to: '/#services' }
  const workLink: NavLink = { id: 'work', label: 'Work', to: '/#work' }

  it('marks Home active on / with no hash', () => {
    expect(isNavLinkActive(homeLink, route({ name: 'home', path: '/', hash: '' }))).toBe(true)
  })

  it('does not mark Home active when a section hash is present', () => {
    expect(
      isNavLinkActive(homeLink, route({ name: 'home', path: '/', hash: '#services' })),
    ).toBe(false)
  })

  it('marks a section link active when the route hash matches', () => {
    expect(
      isNavLinkActive(servicesLink, route({ name: 'home', path: '/', hash: '#services' })),
    ).toBe(true)
  })

  it('marks Work active when the route hash matches', () => {
    expect(
      isNavLinkActive(workLink, route({ name: 'home', path: '/', hash: '#work' })),
    ).toBe(true)
  })
})

describe('resolveActiveHomeSection', () => {
  const mockSections = (layout: Record<string, { top: number; height: number }>) => {
    const getElementById = (id: string): HTMLElement | null => {
      const section = layout[id]
      if (!section) return null

      return {
        getBoundingClientRect: () => ({
          top: section.top,
          bottom: section.top + section.height,
          left: 0,
          right: 0,
          width: 0,
          height: section.height,
          x: 0,
          y: section.top,
          toJSON: () => ({}),
        }),
      } as HTMLElement
    }

    return getElementById
  }

  it('marks Home at the top of the page', () => {
    expect(
      resolveActiveHomeSection({
        scrollY: 0,
        getElementById: mockSections({
          home: { top: 88, height: 900 },
          services: { top: 988, height: 1200 },
          work: { top: 2188, height: 800 },
          team: { top: 2988, height: 600 },
        }),
      }),
    ).toBe('home')
  })

  it('marks Services once that section crosses the header trigger line', () => {
    expect(
      resolveActiveHomeSection({
        scrollY: 1000,
        getElementById: mockSections({
          home: { top: -912, height: 900 },
          services: { top: 76, height: 1200 },
          work: { top: 1276, height: 800 },
          team: { top: 2076, height: 600 },
        }),
      }),
    ).toBe('services')
  })

  it('marks Impact when the stats section is in view', () => {
    expect(
      resolveActiveHomeSection({
        scrollY: 2000,
        getElementById: mockSections({
          home: { top: -1900, height: 900 },
          services: { top: -1000, height: 1200 },
          work: { top: -100, height: 800 },
          team: { top: 50, height: 600 },
        }),
      }),
    ).toBe('team')
  })
})
