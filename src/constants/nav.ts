import type { NavLink } from '@/types'

export const NAV_LINKS: readonly NavLink[] = [
  { id: 'home', label: 'Home', to: '/' },
  { id: 'services', label: 'Services', to: '/#services' },
  { id: 'work', label: 'Work', to: '/#work' },
  // The `#team` anchor points at StatsSection (id="team"). The section is a
  // by-the-numbers strip, not a team page — labeled "Impact" so the nav matches
  // what visitors actually land on. A real team section can replace this later
  // without changing the anchor target.
  { id: 'team', label: 'Impact', to: '/#team' },
  { id: 'get-started', label: 'Get Started', to: '/get-started' },
] as const

/** Header nav excludes the Get Started CTA (rendered as a separate button). */
export const NAV_HEADER_LINKS = NAV_LINKS.filter((link) => link.id !== 'get-started')
