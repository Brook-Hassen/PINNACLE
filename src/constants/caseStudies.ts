import type { CaseStudy } from '@/types'
import logoMark from '@/assets/brand/pinnacle_logomark.svg'

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    id: 'work-1',
    slug: 'work-1',
    title: 'Work 1 Title',
    category: 'Case Study',
    summary: 'Image or video of the work.',
    details: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    ],
    media: [
      {
        id: 'work-1-image',
        type: 'image',
        src: logoMark,
        alt: 'Work 1 image or video placeholder',
      },
    ],
  },
  {
    id: 'brand-ops-suite',
    slug: 'brand-ops-suite',
    title: 'Work 2 Title',
    category: 'Case Study',
    summary: 'Image or video of the work.',
    details: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    ],
    media: [
      {
        id: 'work-2-image',
        type: 'image',
        src: logoMark,
        alt: 'Work 2 image or video placeholder',
      },
    ],
  },
  {
    id: 'launch-growth-kit',
    slug: 'launch-growth-kit',
    title: 'Work 3 Title',
    category: 'Case Study',
    summary: 'Image or video of the work.',
    details: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    ],
    media: [
      {
        id: 'work-3-image',
        type: 'image',
        src: logoMark,
        alt: 'Work 3 image or video placeholder',
      },
    ],
  },
] as const
