import type { ServiceItem } from '@/types'

export const SERVICES: readonly ServiceItem[] = [
  {
    id: 'video-photo-editing',
    title: 'Video & Photo Editing',
    description:
      'Commercial and promo edits, social reels, documentary cuts, color grading, photo retouching, motion graphics, subtitles, and exports sized for Instagram, TikTok, YouTube, and broadcast',
  },
  {
    id: 'graphics-design',
    title: 'Graphics Design',
    description:
      'Logo design, brand guidelines, color and type systems, flyers, brochures, posters, business cards, social posts, LinkedIn graphics, display ads, pitch decks, and investor presentations',
  },
  {
    id: 'web-apps-systems',
    title: 'Web, Apps & Systems',
    description:
      'Websites, landing pages, iOS and Android apps, SaaS dashboards, e-commerce, API development, system architecture, cloud on AWS, GCP, and Azure, database design, security, CI/CD, and DevOps',
  },
  {
    id: 'business-consultation',
    title: 'Business Consultation',
    description:
      'Market research, competitor analysis, business model design, budget planning, startup cost breakdown, launch roadmaps, legal and operational setup, vendor sourcing, hands-on launch support, and ongoing advisory',
  },
  {
    id: 'social-media-management',
    title: 'Social Media Management',
    description:
      'Content strategy, editorial calendars, feed and story design, short-form video, copywriting, multi-platform scheduling, community management, influencer outreach, performance dashboards, and growth reporting',
  },
] as const
