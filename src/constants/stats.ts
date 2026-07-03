import type { StatItem } from '@/types'

// TODO (pre-launch): verify and replace each value with audited business
// figures. The numbers below are unverified placeholders carried over from
// design-phase scaffolding and should not ship without confirmation.
export const STATS: readonly StatItem[] = [
  { id: 'projects-delivered', label: 'Projects delivered', value: '75+' },
  { id: 'team-members', label: 'Team members', value: '16' },
  { id: 'clients-worldwide', label: 'Clients worldwide', value: '22+' },
  { id: 'experience', label: 'Years experience', value: '5+' },
] as const
