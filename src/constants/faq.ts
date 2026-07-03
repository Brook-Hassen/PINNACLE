import type { FaqItem } from '@/types'

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: 'first-results',
    question: 'How quickly can I expect to see the first results?',
    answer:
      'Most clients see something tangible in the first delivery cycle. We agree on measurable milestones at kickoff and track them as work moves.',
  },
  {
    id: 'management-led-strategy',
    question: 'What exactly is management-led strategy?',
    answer:
      'Senior strategists stay on the account from discovery through delivery. Business goals stay in the room when scope, design, and technical calls get made.',
  },
  {
    id: 'post-project-support',
    question: 'Do you offer support after the project is finished?',
    answer:
      'Yes. We offer ongoing support for maintenance, optimization, and iteration when you need someone who already knows the codebase or the brand system.',
  },
  {
    id: 'existing-stack',
    question: 'Can you work with my existing tech stack?',
    answer:
      'Yes. We audit what you have first and improve it in place. Full rewrites only happen when the current setup genuinely cannot support what you need next.',
  },
  {
    id: 'project-communication',
    question: 'How do we communicate during the project?',
    answer:
      'Weekly checkpoints, milestone demos, and a named owner for each workstream. You always know who to ping and what shipped that week.',
  },
  {
    id: 'design-satisfaction',
    question: 'What happens if I am not happy with a design?',
    answer:
      'We iterate against the brief and the feedback you gave at kickoff. Revisions stay focused on the agreed goals until the output matches them.',
  },
] as const
