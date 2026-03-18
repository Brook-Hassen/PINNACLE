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

export interface BenefitItem {
  id: string
  title: string
  description: string
}

export type CaseStudyMediaType = 'image' | 'video'

export interface CaseStudyMedia {
  id: string
  type: CaseStudyMediaType
  src: string
  alt: string
  poster?: string
}

export interface CaseStudy {
  id: string
  slug: string
  title: string
  category: string
  summary: string
  details: string[]
  media: CaseStudyMedia[]
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
