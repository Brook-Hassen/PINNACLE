import type { ServicePage } from '@/types'
import type { ServiceSlug } from './serviceSlugs'
import { SERVICE_SLUGS } from './serviceSlugs'

export const SERVICE_PAGES: readonly ServicePage[] = [
  {
    id: 'graphics-design',
    slug: 'graphics-design',
    title: 'Graphics Design',
    category: 'Graphics Design',
    headline: 'Designs That Make Brands Impossible To Ignore',
    description:
      'Your audience forms an opinion about your business in seconds. We help you make those seconds count with strategic, professional, and visually compelling designs that build trust and drive engagement.',
    supportingCopy:
      'New launch or refresh, we shape visuals around what you need the audience to do next. Decks, ads, and social assets that read as one company.',
    seoDescription:
      'Graphics design for brands that need to look sharp and stay consistent: identity systems, marketing materials, social creatives, and pitch decks from senior designers.',
    offerings: [
      {
        id: 'brand-identity',
        title: 'Brand Identity Design',
        items: [
          'Logo design',
          'Brand guidelines',
          'Color systems',
          'Typography selection',
          'Visual identity systems',
        ],
      },
      {
        id: 'marketing-materials',
        title: 'Marketing Materials',
        items: ['Flyers', 'Brochures', 'Posters', 'Roll-up banners', 'Business cards'],
      },
      {
        id: 'social-media-design',
        title: 'Social Media Design',
        items: [
          'Instagram posts',
          'Facebook creatives',
          'LinkedIn graphics',
          'Story templates',
          'Carousel designs',
        ],
      },
      {
        id: 'advertising-creatives',
        title: 'Advertising Creatives',
        items: [
          'Display ads',
          'Campaign graphics',
          'Promotional materials',
          'Product advertisements',
        ],
      },
      {
        id: 'presentation-design',
        title: 'Presentation Design',
        items: [
          'Company profiles',
          'Pitch decks',
          'Investor presentations',
          'Corporate reports',
        ],
      },
    ],
    process: [
      {
        id: 'discovery',
        step: '01',
        title: 'Discovery',
        description: 'We learn the brand, the audience, and what this project needs to achieve.',
      },
      {
        id: 'concept',
        step: '02',
        title: 'Concept Creation',
        description: 'Two or three directions with rationale, not a wall of random mood boards.',
      },
      {
        id: 'development',
        step: '03',
        title: 'Design Development',
        description: 'Layouts, type, and color applied across the agreed formats.',
      },
      {
        id: 'refinement',
        step: '04',
        title: 'Feedback & Refinement',
        description: 'Revisions tied to the brief until the files are ready to ship.',
      },
      {
        id: 'delivery',
        step: '05',
        title: 'Final Delivery',
        description: 'Organized source files and exports sized for print, web, and social.',
      },
    ],
    benefits: [
      {
        id: 'recognition',
        title: 'Memorable brand presence',
        description:
          'One visual system across ads, decks, and social. People recognize you before they read the headline.',
      },
      {
        id: 'conversion',
        title: 'Higher conversion rates',
        description:
          'Hierarchy, type, and spacing guide the eye toward the action. Signup, purchase, or booked call, the layout does the pointing.',
      },
      {
        id: 'velocity',
        title: 'Faster go-to-market',
        description:
          'Templates and documented rules let your team ship new creatives in hours. No waiting on a designer for every resize.',
      },
      {
        id: 'trust',
        title: 'Credibility at first glance',
        description:
          'Prospects judge operational quality from how you look. Polished materials buy you time before they read a word of copy.',
      },
    ],
    portfolio: [
      {
        id: 'brand-system',
        title: 'Identity for a payments startup',
        category: 'Brand Identity',
        description:
          'A young fintech team was pitching investors and onboarding merchants with mismatched decks, ads, and product screens. They needed one visual language everyone could use without asking a designer every time.',
        delivered: [
          'Primary logo and wordmark with clear usage rules',
          'Color, type, and spacing system documented for the whole team',
          'Launch deck, social templates, and sales one-pager in the new look',
        ],
        outcome: 'The team stopped debating fonts in Slack and started shipping materials that looked like the same company.',
      },
      {
        id: 'campaign-kit',
        title: 'Launch campaign for a SaaS product',
        category: 'Marketing',
        description:
          'A product team was going live in three markets at once. Marketing needed ads, event banners, and social posts that felt like one campaign, not three stitched together.',
        delivered: [
          'Paid social and display ad set across LinkedIn and Meta',
          'Carousel and story templates the internal team could reuse',
          'Event booth graphics and pull-up banners for two launch cities',
        ],
        outcome: 'Marketing had a full launch kit in hand before the first demo day, with templates ready for the next release.',
      },
      {
        id: 'pitch-deck',
        title: 'Series A pitch deck redesign',
        category: 'Presentation',
        description:
          'Founders had strong traction but a deck that buried the story under dense slides and inconsistent charts. They needed investors to grasp the opportunity in the first five minutes.',
        delivered: [
          'Narrative restructure from problem to traction to ask',
          'Slide system with consistent layout, typography, and data styling',
          'Speaker notes and a leave-behind PDF version',
        ],
        outcome: 'The deck became something founders sent ahead of meetings and updated each quarter without starting over.',
      },
    ],
    cta: {
      headline: "Let's build a brand people remember.",
      description:
        'Tell us where you are and where you want to go. We will map the design work to get you there.',
    },
  },
  {
    id: 'video-photo-editing',
    slug: 'video-photo-editing',
    title: 'Video & Photo Editing',
    category: 'Video & Photo Editing',
    headline: 'Footage That Holds Attention From Frame One',
    description:
      'Raw captures rarely tell the story your audience needs to hear. We shape light, rhythm, and narrative so every second earns the next — for product launches, event coverage, or your next batch of content.',
    supportingCopy:
      'We handle grading, sound, and exports sized for each platform. You get files you can post, not a folder you still have to figure out.',
    seoDescription:
      'Video and photo editing: color grading, motion graphics, retouching, and platform-ready exports for teams that need content that holds attention.',
    offerings: [
      {
        id: 'video-editing',
        title: 'Video Editing',
        items: [
          'Commercial and promo edits',
          'Social reels and vertical cuts',
          'Documentary and interview pacing',
          'Multi-cam synchronization',
          'Subtitles and captions',
        ],
      },
      {
        id: 'color-grading',
        title: 'Color & Finishing',
        items: [
          'Cinematic color grading',
          'LUT development',
          'Skin-tone correction',
          'HDR & SDR deliverables',
          'Brand-consistent look development',
        ],
      },
      {
        id: 'photo-retouching',
        title: 'Photo Retouching',
        items: [
          'Product photography cleanup',
          'Portrait retouching',
          'Background removal & compositing',
          'Batch processing for catalogs',
          'Print-ready export prep',
        ],
      },
      {
        id: 'motion-graphics',
        title: 'Motion Graphics',
        items: [
          'Lower thirds & titles',
          'Logo animations',
          'Explainer motion sequences',
          'Kinetic typography',
          'Social sticker packs',
        ],
      },
      {
        id: 'delivery',
        title: 'Platform Delivery',
        items: [
          'Instagram & TikTok specs',
          'YouTube & LinkedIn formats',
          'Broadcast-ready masters',
          'Thumbnail design',
          'Versioning for A/B tests',
        ],
      },
    ],
    process: [
      {
        id: 'discovery',
        step: '01',
        title: 'Discovery',
        description: 'We review the footage, the goal, and where each cut will live.',
      },
      {
        id: 'planning',
        step: '02',
        title: 'Planning',
        description: 'Edit structure, selects, and look references agreed before the first pass.',
      },
      {
        id: 'execution',
        step: '03',
        title: 'Execution',
        description: 'Cut, grade, audio mix, and motion passes in sequence.',
      },
      {
        id: 'delivery',
        step: '04',
        title: 'Delivery',
        description: 'Masters and aspect-ratio variants packaged for each platform.',
      },
      {
        id: 'optimization',
        step: '05',
        title: 'Optimization',
        description: 'Revisions from performance data or stakeholder feedback.',
      },
    ],
    benefitsDescription:
      "Not vanity metrics. Here's what clients actually walk away with.",
    benefits: [
      {
        id: 'retention',
        title: 'Higher audience retention',
        description:
          "People don't finish videos out of politeness. Pacing has to earn every extra second, and that is what we cut for. Fewer drop-offs before the CTA. More of the video actually watched.",
      },
      {
        id: 'reuse',
        title: 'More assets per shoot',
        description:
          "One shoot day shouldn't mean one final video. We plan the edit before the camera rolls, so a single shoot turns into a month's worth of content across formats.",
      },
      {
        id: 'brand',
        title: 'Cohesive visual language',
        description:
          'Grade and pacing get locked in early and reused across every edit. A clip shot in March still belongs next to one shot in October.',
      },
      {
        id: 'speed',
        title: 'Campaign-ready speed',
        description:
          "Fast doesn't have to mean rushed. Our process is built to hand off launch-ready cuts on tight timelines, without cutting corners to get there.",
      },
    ],
    portfolio: [
      {
        id: 'product-launch',
        title: 'Launch film for a consumer tech brand',
        category: 'Commercial',
        description:
          'The client filmed a multi-camera launch event but the raw footage felt flat and long. They needed a hero film for the website, paid social, and press, plus cut-downs for each platform.',
        delivered: [
          '90-second hero film with color grade, sound mix, and motion titles',
          'Vertical and square versions for Instagram, TikTok, and LinkedIn',
          'Thumbnail frames and a clean master file for partner use',
        ],
        outcome: 'One shoot became the centerpiece of their launch week, ready to post instead of stuck in an edit queue.',
      },
      {
        id: 'social-series',
        title: 'Founder interview series',
        category: 'Social Video',
        description:
          'A B2B founder wanted to show up consistently on LinkedIn without sounding scripted. Twelve interviews were recorded; the team needed them edited, branded, and scheduled.',
        delivered: [
          'Twelve episodes cut for pacing, with branded lower thirds and captions',
          'Consistent intro/outro and thumb templates for the series',
          'Platform-ready exports each week for twelve weeks',
        ],
        outcome: 'The founder posted every week without touching a timeline. The series looked like one show, not twelve one-offs.',
      },
      {
        id: 'product-photos',
        title: 'Catalog retouch for a fashion marketplace',
        category: 'Photo',
        description:
          'A marketplace relaunch depended on hundreds of product shots from different suppliers with inconsistent lighting, backgrounds, and shadows that made the catalog feel cheap.',
        delivered: [
          'Batch retouch across the full SKU set with matched shadow and color',
          'Background cleanup and cropping to a single product grid standard',
          'Print- and web-ready exports organized by collection',
        ],
        outcome: 'The catalog went live looking like one brand shot the whole line, not a patchwork of vendor files.',
      },
    ],
    cta: {
      headline: 'Ready to turn raw footage into something you can ship?',
      description:
        'Send your assets and timeline. We will scope the edit and return a first cut quickly.',
    },
  },
  {
    id: 'web-apps-systems',
    slug: 'web-apps-systems',
    title: 'Web, Apps & Systems',
    category: 'Web, Apps & Systems',
    headline: 'Digital Products and Infrastructure Built as One',
    description:
      'Your website, mobile app, and backend should work as one system — not three vendors guessing at each other. We design, build, and architect the full stack so you launch faster and scale with confidence.',
    supportingCopy:
      'Landing pages, mobile apps, APIs, databases, and deployment handled by one team. Products that look good on launch and stay up when traffic spikes.',
    seoDescription:
      'Web, app, and system engineering in one place: marketing sites, mobile apps, SaaS platforms, API design, cloud infrastructure, and DevOps from senior engineers.',
    offerings: [
      {
        id: 'marketing-sites',
        title: 'Marketing Websites',
        items: [
          'High-converting landing pages',
          'Multi-page corporate websites',
          'CMS integration',
          'SEO-ready site architecture',
          'Analytics setup',
        ],
      },
      {
        id: 'web-mobile',
        title: 'Web & Mobile Apps',
        items: [
          'SaaS dashboards',
          'Customer portals',
          'Internal tools',
          'iOS apps',
          'Android apps',
          'Cross-platform mobile apps',
          'Progressive web apps',
          'App store deployment',
        ],
      },
      {
        id: 'integrations',
        title: 'Integrations & APIs',
        items: [
          'Payment gateways',
          'CRM connections',
          'Third-party API wiring',
          'Webhook pipelines',
          'Data migration scripts',
          'API gateway design',
        ],
      },
      {
        id: 'architecture',
        title: 'System Architecture',
        items: [
          'Microservices and monolith strategy',
          'Event-driven design',
          'Service boundary definition',
          'Database schema design',
          'ETL pipeline architecture',
          'Technical debt audits',
        ],
      },
      {
        id: 'cloud',
        title: 'Cloud & Infrastructure',
        items: [
          'AWS, GCP, and Azure topology',
          'Container orchestration',
          'Auto-scaling configuration',
          'CI/CD setup',
          'Disaster recovery planning',
          'Cost optimization reviews',
        ],
      },
      {
        id: 'data-security',
        title: 'Data, Security & DevOps',
        items: [
          'Auth and identity architecture',
          'Encryption standards',
          'Observability stack design',
          'Monitoring and alerting',
          'Load testing frameworks',
          'Security hardening',
        ],
      },
    ],
    process: [
      {
        id: 'discovery',
        step: '01',
        title: 'Discovery',
        description: 'Users, flows, constraints, and where you expect traffic to land.',
      },
      {
        id: 'planning',
        step: '02',
        title: 'Planning',
        description: 'Architecture choices, sprint plan, and a prototype if the scope needs one.',
      },
      {
        id: 'execution',
        step: '03',
        title: 'Execution',
        description: 'Build sprints with integrations and infrastructure in parallel.',
      },
      {
        id: 'delivery',
        step: '04',
        title: 'Delivery',
        description: 'Staging review, QA, production deploy, and handoff docs.',
      },
      {
        id: 'optimization',
        step: '05',
        title: 'Optimization',
        description: 'Performance tuning, monitoring, and capacity planning after launch.',
      },
    ],
    benefits: [
      {
        id: 'revenue',
        title: 'Revenue-ready experiences',
        description:
          'Load time, CTA placement, and checkout flow are instrumented from day one. You see where people drop off and what to fix.',
      },
      {
        id: 'scale',
        title: 'Infrastructure that grows',
        description:
          'Architecture sized for the next doubling of users, not just launch day. Add features without a ground-up rebuild.',
      },
      {
        id: 'uptime',
        title: 'Reliability under pressure',
        description:
          'Failover paths and tested rollback keep the product running when a dependency goes down or traffic jumps.',
      },
      {
        id: 'trust',
        title: 'Security and compliance ready',
        description:
          'Auth, data handling, and deploy practices built for teams that cannot afford downtime or a sloppy breach response.',
      },
    ],
    portfolio: [
      {
        id: 'saas-dashboard',
        title: 'Operations portal for a growing SaaS team',
        category: 'Web App',
        description:
          'A scaling SaaS company was running operations out of spreadsheets and a legacy admin panel nobody trusted. They needed one place for their team to see status, take action, and onboard new hires quickly.',
        delivered: [
          'Role-based dashboard with the workflows their ops team actually uses',
          'Clean handoff docs and a component library their engineers could extend',
          'Production deploy with staging environment and basic monitoring',
        ],
        outcome: 'Ops stopped copying data between tools. New team members could use the product on day one.',
      },
      {
        id: 'api-platform',
        title: 'One front door for partner integrations',
        category: 'Architecture',
        description:
          'Every new partner meant another custom integration, another set of credentials, and another thing to break at 2 a.m. The team needed a single, documented way in without rewriting everything at once.',
        delivered: [
          'Unified API gateway in front of their existing services',
          'Partner onboarding flow with keys, docs, and sandbox access',
          'Migration path so legacy integrations could move over in phases',
        ],
        outcome: 'New partners go live in days instead of weeks. The engineering team sleeps better.',
      },
      {
        id: 'infra-migration',
        title: 'Cloud migration without a launch-night panic',
        category: 'Infrastructure',
        description:
          'On-prem servers were becoming a liability: expensive, fragile, and slowing releases. The move to cloud had failed once already because nobody mapped dependencies or rollback paths.',
        delivered: [
          'Cloud architecture sized for their actual traffic patterns',
          'CI/CD pipeline so deploys were repeatable, not manual SSH sessions',
          'Cutover plan with rollback steps and a dry run before go-live',
        ],
        outcome: 'They migrated on schedule with no emergency all-hands. Infra costs finally matched how much they actually use.',
      },
    ],
    cta: {
      headline: 'Build the product your market is waiting for.',
      description:
        'Describe the idea and the constraints. We will return a technical plan, architecture outline, and realistic timeline.',
    },
  },
  {
    id: 'business-consultation',
    slug: 'business-consultation',
    title: 'Business Consultation',
    category: 'Business Consultation',
    headline: 'From Idea to Launch — With a Plan That Fits Your Budget',
    description:
      'Starting a business takes more than enthusiasm. You need market clarity, a realistic budget, and a step-by-step path to your first customers. We research, plan, and help you execute — so you are not guessing your way through launch.',
    supportingCopy:
      'Market research, budget modeling, operational setup, and hands-on launch help. Work scoped to what you can actually afford right now.',
    seoDescription:
      'Business consultation for startups and new ventures: market research, budget planning, launch roadmaps, operational setup, and hands-on support to get moving.',
    offerings: [
      {
        id: 'market-research',
        title: 'Market & Opportunity Research',
        items: [
          'Competitor and market analysis',
          'Customer need validation',
          'Market sizing and demand signals',
          'Location and channel research',
          'Industry trend and risk assessment',
        ],
      },
      {
        id: 'business-planning',
        title: 'Business Planning & Strategy',
        items: [
          'Business model design',
          'Value proposition development',
          'Revenue stream mapping',
          'SWOT and positioning analysis',
          'Go-to-market strategy',
        ],
      },
      {
        id: 'budget-planning',
        title: 'Budget & Financial Planning',
        items: [
          'Startup cost breakdown',
          'Runway and cash-flow modeling',
          'Pricing strategy',
          'Break-even analysis',
          'Budget-tier launch plans',
        ],
      },
      {
        id: 'operational-setup',
        title: 'Legal & Operational Setup',
        items: [
          'Business structure guidance',
          'Licensing and compliance checklists',
          'Tool and vendor recommendations',
          'Workflow and process design',
          'Hiring and outsourcing plan outline',
        ],
      },
      {
        id: 'launch-support',
        title: 'Hands-On Launch Support',
        items: [
          'Brand and digital kickoff coordination',
          'Supplier and partner sourcing',
          'First campaign and sales setup',
          'Launch milestone tracking',
          'Ongoing advisory check-ins',
        ],
      },
    ],
    process: [
      {
        id: 'discovery',
        step: '01',
        title: 'Discovery',
        description: 'Your idea, skills, budget, timeline, and what success looks like.',
      },
      {
        id: 'research',
        step: '02',
        title: 'Research',
        description: 'Market, competitor, and customer research scoped to your sector.',
      },
      {
        id: 'planning',
        step: '03',
        title: 'Planning',
        description: 'Phased launch roadmap with options matched to your budget.',
      },
      {
        id: 'execution',
        step: '04',
        title: 'Execution',
        description: 'Hands-on help with registrations, tools, brand kickoff, and ops setup.',
      },
      {
        id: 'launch',
        step: '05',
        title: 'Launch & Review',
        description: 'First sales push, feedback loops, and adjustments for month one.',
      },
    ],
    benefits: [
      {
        id: 'clarity',
        title: 'Clarity before you spend',
        description:
          'Know what you are building, who it is for, and what it will cost before money goes to the wrong vendor or channel.',
      },
      {
        id: 'budget-fit',
        title: 'A roadmap that fits your budget',
        description:
          'Phased plans let you start lean, prove traction, and add spend only when the numbers support it.',
      },
      {
        id: 'speed',
        title: 'Faster time to first revenue',
        description:
          'Structured launch steps cut weeks of indecision. You start selling, pitching, or operating sooner.',
      },
      {
        id: 'support',
        title: 'Help beyond the spreadsheet',
        description:
          'We stay involved through registration, vendor sourcing, and the first weeks of operations, not just the research deck.',
      },
    ],
    portfolio: [
      {
        id: 'food-startup',
        title: 'Budget launch plan for a local food brand',
        category: 'Startup',
        description:
          'A founder had a strong recipe and local buzz but no clear path from kitchen tests to a sellable business. They needed to know costs, permits, packaging, and how to reach first customers without overspending.',
        delivered: [
          'Market scan of local competitors and price points',
          'Three-tier budget plan from home-based start to small retail',
          'Permit checklist, supplier shortlist, and launch-week action plan',
        ],
        outcome: 'They launched within budget, knew exactly what each next step cost, and had their first paying customers in week three.',
      },
      {
        id: 'tech-founder',
        title: 'Go-to-market plan for a first-time tech founder',
        category: 'Strategy',
        description:
          'A developer built a working product but had never run a company. They needed to understand their market, pricing, and how to reach buyers without hiring a full team on day one.',
        delivered: [
          'Competitive analysis and positioning document',
          'Pricing model with three scenarios based on their runway',
          '90-day launch roadmap covering sales, marketing, and operations',
        ],
        outcome: 'The founder stopped rebuilding features nobody asked for and started conversations with real prospects in the first month.',
      },
      {
        id: 'retail-expansion',
        title: 'Operational setup for a retail expansion',
        category: 'Operations',
        description:
          'A small retailer wanted to open a second location but had no systems for inventory, staffing, or local marketing. Every decision felt like a guess.',
        delivered: [
          'Location comparison research with foot-traffic and cost factors',
          'Opening budget with contingency built in',
          'Vendor, staffing, and launch checklist executed alongside the owner',
        ],
        outcome: 'Second location opened on schedule with processes the owner could repeat for location three.',
      },
    ],
    cta: {
      headline: 'Ready to turn your idea into a real business?',
      description:
        'Tell us the idea and the budget. We will research the opportunity and map a launch plan you can follow.',
    },
  },
  {
    id: 'social-media-management',
    slug: 'social-media-management',
    title: 'Social Media Management',
    category: 'Social Media Management',
    headline: 'Social Presence That Builds Community, Not Just Follower Counts',
    description:
      'Posting consistently is the baseline. Winning on social means showing up with strategy: content calendars aligned to business goals, community engagement that builds loyalty, and creative that stops the scroll without sacrificing brand voice.',
    supportingCopy:
      'Strategy, content production, publishing, community replies, and monthly reporting. Your channels run on a calendar, not last-minute scrambles.',
    seoDescription:
      'Social media management: content calendars, community replies, platform-native creative, and reporting for teams that want steady output, not random posts.',
    offerings: [
      {
        id: 'strategy',
        title: 'Content Strategy',
        items: [
          'Platform-specific editorial plans',
          'Audience persona development',
          'Competitive benchmarking',
          'Campaign theme development',
          'Hashtag & SEO research',
        ],
      },
      {
        id: 'creative',
        title: 'Content Production',
        items: [
          'Feed & story graphics',
          'Short-form video edits',
          'Copywriting & captions',
          'Carousel & thread design',
          'UGC curation & rights management',
        ],
      },
      {
        id: 'publishing',
        title: 'Publishing & Scheduling',
        items: [
          'Multi-platform scheduling',
          'Optimal timing analysis',
          'Cross-posting adaptation',
          'Campaign launch coordination',
          'Crisis communication protocols',
        ],
      },
      {
        id: 'community',
        title: 'Community Management',
        items: [
          'Comment & DM response',
          'Brand voice guidelines',
          'Escalation workflows',
          'Influencer outreach',
          'Review & reputation monitoring',
        ],
      },
      {
        id: 'analytics',
        title: 'Analytics & Reporting',
        items: [
          'Monthly performance dashboards',
          'Growth & engagement tracking',
          'Content ROI analysis',
          'A/B test reporting',
          'Quarterly strategy reviews',
        ],
      },
    ],
    process: [
      {
        id: 'discovery',
        step: '01',
        title: 'Discovery',
        description: 'Channel audit, audience review, competitor scan, and tone check.',
      },
      {
        id: 'planning',
        step: '02',
        title: 'Planning',
        description: 'Editorial calendar and content pillars tied to business goals.',
      },
      {
        id: 'execution',
        step: '03',
        title: 'Execution',
        description: 'Produce, schedule, and publish across the agreed platforms.',
      },
      {
        id: 'delivery',
        step: '04',
        title: 'Delivery',
        description: 'Community replies, campaign wrap-ups, and monthly reporting.',
      },
      {
        id: 'optimization',
        step: '05',
        title: 'Optimization',
        description: 'Double down on what performed and adjust the next month\'s plan.',
      },
    ],
    benefits: [
      {
        id: 'reach',
        title: 'Organic reach that compounds',
        description:
          'Steady, on-brand posting trains the algorithm to show your content. Paid boost becomes optional, not mandatory.',
      },
      {
        id: 'leads',
        title: 'Pipeline from social',
        description:
          'CTAs, link strategy, and DM workflows turn comments and saves into booked calls and qualified inquiries.',
      },
      {
        id: 'brand',
        title: 'Voice consistency at scale',
        description:
          'Tone guidelines and approval steps keep every post sounding like you, even at high volume.',
      },
      {
        id: 'time',
        title: 'Founder time reclaimed',
        description:
          'Leadership stops context-switching into Canva and comment threads and stays focused on running the business.',
      },
    ],
    portfolio: [
      {
        id: 'launch-campaign',
        title: 'Social launch for a consumer app',
        category: 'Campaign',
        description:
          'A small team was launching an app with no in-house social producer. They needed a month of content that felt intentional, not random posts thrown up on launch day.',
        delivered: [
          '30-day content calendar across Instagram, TikTok, and X',
          'Creative assets, captions, and posting schedule aligned to launch milestones',
          'Community response templates so founders were not caught off guard',
        ],
        outcome: 'Launch week looked planned and professional even though the team was busy shipping the product itself.',
      },
      {
        id: 'thought-leadership',
        title: 'LinkedIn presence for a B2B founder',
        category: 'LinkedIn',
        description:
          'A technical founder had strong opinions but no time to write. They wanted to be visible to buyers without sounding like a ghostwritten motivational poster.',
        delivered: [
          'Editorial calendar tied to product milestones and industry moments',
          'Carousel and long-form posts drafted in the founder\'s voice',
          'Weekly publishing rhythm with approval flow that took ten minutes, not an hour',
        ],
        outcome: 'Inbound conversations started coming from posts because the right people were reading, not because of vanity metrics.',
      },
      {
        id: 'community-growth',
        title: 'Community program for a lifestyle brand',
        category: 'Engagement',
        description:
          'The brand had followers but little conversation. Comments went unanswered, UGC was unused, and the feed felt like a broadcast, not a community.',
        delivered: [
          'Response playbook so every comment and DM had a consistent, human tone',
          'UGC sourcing and repost workflow with clear rights handling',
          'Monthly themes that gave followers a reason to participate, not just scroll',
        ],
        outcome: 'The feed started feeling alive. Customers saw themselves in the brand, and the team had a system to keep it going.',
      },
    ],
    cta: {
      headline: 'Make social a channel that actually pulls its weight.',
      description:
        'Tell us your platforms and goals. We will propose a content system built to perform.',
    },
  },
] as const

/** Compile-time guard: every slug in SERVICE_SLUGS must have a page entry. */
type _SlugCoverage = ServiceSlug extends (typeof SERVICE_PAGES)[number]['slug'] ? true : never
const _slugCoverage: _SlugCoverage = true
void _slugCoverage

export const getServiceBySlug = (slug: string): ServicePage | undefined =>
  SERVICE_PAGES.find((page) => page.slug === slug)

export const getServiceIndex = (slug: string): number =>
  SERVICE_PAGES.findIndex((page) => page.slug === slug)

export const servicePath = (slug: string): string => `/services/${slug}`
