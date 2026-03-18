import type { BenefitItem } from '@/types'

export const BENEFITS: readonly BenefitItem[] = [
  {
    id: 'rapid-market-entry',
    title: 'Rapid Market Entry',
    description: 'Accelerated delivery cycles designed to launch your product in record time.',
  },
  {
    id: 'direct-expert-access',
    title: 'Direct Expert Access',
    description: 'Work directly with architects and designers, skipping the agency middleman.',
  },
  {
    id: 'integrated-ecosystems',
    title: 'Seamless Integrated Ecosystems',
    description: 'Unify your web, video, and social presence into one high-converting engine.',
  },
] as const
