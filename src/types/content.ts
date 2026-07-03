export interface NavLink {
  id: string
  label: string
  to: string
}

export interface ServiceItem {
  id: string
  title: string
  description: string
}

export interface ServiceOfferingGroup {
  id: string
  title: string
  items: readonly string[]
}

export interface ServiceProcessStep {
  id: string
  step: string
  title: string
  description: string
}

export interface ServiceBenefit {
  id: string
  title: string
  description: string
}

export interface ServicePortfolioItem {
  id: string
  title: string
  category: string
  description: string
  delivered: readonly string[]
  outcome: string
}

export interface ServicePage {
  id: string
  slug: string
  title: string
  category: string
  headline: string
  description: string
  supportingCopy: string
  seoDescription: string
  offerings: readonly ServiceOfferingGroup[]
  process: readonly ServiceProcessStep[]
  benefits: readonly ServiceBenefit[]
  /** Optional override for the Benefits section subheading. */
  benefitsDescription?: string
  portfolio: readonly ServicePortfolioItem[]
  cta: {
    headline: string
    description: string
  }
}

export interface BenefitItem {
  id: string
  title: string
  description: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface StatItem {
  id: string
  label: string
  value: string
}
