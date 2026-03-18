import type { StatItem } from '@/types'

export const STATS: readonly StatItem[] = [
  { id: 'projects-delivered', label: 'Projects delivered', value: '75+' },
  { id: 'team-members', label: 'Team members', value: '16' },
  { id: 'clients-worldwide', label: 'Clients worldwide', value: '22+' },
  { id: 'experience', label: 'Years experience', value: '5+' },
] as const
