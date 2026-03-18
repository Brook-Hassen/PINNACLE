import type { ServiceItem } from '@/types'

export const SERVICES: readonly ServiceItem[] = [
  {
    id: 'video-photo-editing',
    title: 'Video & Photo Editing',
    description: 'Cinematic post-production and high-fidelity editing optimized for every platform.',
  },
  {
    id: 'graphics-design',
    title: 'Graphics Design',
    description:
      'Comprehensive visual systems: logo design, professional stationery, and high-quality print-ready assets.',
  },
  {
    id: 'web-app-development',
    title: 'Web & App Development',
    description: 'Full-stack development of responsive websites and scalable mobile applications.',
  },
  {
    id: 'system-design',
    title: 'System Design',
    description: 'Designing robust backend systems and data logistics to ensure seamless technical operations.',
  },
  {
    id: 'social-media-management',
    title: 'Social Media Management',
    description: 'Strategic oversight of social ecosystems to maintain active and relevant brand engagement.',
  },
] as const
