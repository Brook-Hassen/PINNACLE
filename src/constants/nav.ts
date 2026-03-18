import type { NavLink } from '@/types'

export const NAV_LINKS: readonly NavLink[] = [
  { id: 'home', label: 'Home', to: '/' },
  { id: 'services', label: 'Services', to: '/#services' },
  { id: 'work', label: 'Work', to: '/#work' },
  { id: 'case-studies', label: 'Case studies', to: '/#case-studies' },
  { id: 'team', label: 'Team', to: '/#team' },
] as const
