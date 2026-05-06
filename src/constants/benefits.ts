import type { BenefitItem } from '@/types'

export const BENEFITS: readonly BenefitItem[] = [
  {
    id: 'rapid-market-entry',
    title: 'Rapid Market Entry',
    description: 'Accelerated development cycles designed to launch your product in record time.',
  },
  {
    id: 'direct-expert-access',
    title: 'Direct Expert Access',
    description: 'Work directly with architects and designers, skipping the agency middleman.',
  },
  {
    id: 'integrated-ecosystems',
    title: 'Seamless Integrated Ecosystems',
    description: 'Unifying your web, video, and social presence into one high-converting engine.',
  },
  {
    id: 'management-led-strategy',
    title: 'Management-Led Strategy',
    description: 'Solutions engineered to align technical execution with your corporate objectives.',
  },
  {
    id: 'architectural-precision',
    title: 'Architectural Precision',
    description: 'High-performance systems built on robust, scalable full-stack foundations.',
  },
] as const
