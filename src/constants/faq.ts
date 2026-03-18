import type { FaqItem } from '@/types'

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: 'first-results',
    question: 'How quickly can I expect to see the first results?',
    answer:
      'Most clients see early indicators within the first delivery cycle. We define measurable milestones at kickoff and track progress continuously.',
  },
  {
    id: 'management-led-strategy',
    question: 'What exactly is management-led strategy?',
    answer:
      'It means senior strategists stay directly involved from discovery through execution to keep every decision aligned with business goals.',
  },
  {
    id: 'post-project-support',
    question: 'Do you offer support after the project is finished?',
    answer:
      'Yes. We provide structured support options for optimization, maintenance, and iterative growth work.',
  },
  {
    id: 'existing-stack',
    question: 'Can you work with my existing tech stack?',
    answer:
      'Absolutely. We audit your current architecture and integrate improvements without forcing unnecessary rewrites.',
  },
  {
    id: 'project-communication',
    question: 'How do we communicate during the project?',
    answer:
      'We run a transparent cadence with weekly checkpoints, milestone demos, and a clear owner for every workstream.',
  },
  {
    id: 'design-satisfaction',
    question: 'What happens if I am not happy with a design?',
    answer:
      'We iterate against agreed objectives and feedback loops until the output meets both brand and performance standards.',
  },
] as const
