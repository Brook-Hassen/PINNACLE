import type { BenefitItem } from '@/types'

export const BENEFITS: readonly BenefitItem[] = [
  {
    id: 'rapid-market-entry',
    title: 'Rapid Market Entry',
    description:
      'Milestones are set at kickoff. You see usable work in the first delivery cycle instead of waiting months for a single reveal.',
  },
  {
    id: 'direct-expert-access',
    title: 'Direct Expert Access',
    description:
      'The people doing the work sit in your thread. No account manager passing notes to a team you never meet.',
  },
  {
    id: 'integrated-ecosystems',
    title: 'One team, every channel',
    description:
      'Your site, ads, and social posts share the same type, colors, and tone. Less rewriting every time something ships.',
  },
  {
    id: 'management-led-strategy',
    title: 'Management-Led Strategy',
    description:
      'Senior leads stay on the account through delivery. Decisions get made with business context, not just layout preferences.',
  },
  {
    id: 'architectural-precision',
    title: 'Architectural Precision',
    description:
      'New features slot in without breaking what already works. Handoff docs included when your internal team takes over.',
  },
] as const
