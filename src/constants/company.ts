/**
 * Centralized company contact + identity data.
 *
 * Social URLs default to `null` so the footer + contact rails can hide or
 * inertly render the chip until a real URL is provided — preventing the
 * `href="#"` scroll-to-top regression.
 */

export interface SocialLink {
  id: string
  label: string
  href: string | null
}

export interface CompanyContact {
  email: string
  location: string
  responseTime: string
}

export const COMPANY_CONTACT: CompanyContact = {
  email: 'contact@pinnxai.com',
  location: 'Remote · GMT-5 to GMT+3',
  responseTime: 'Within 24h',
}

// Public profile URLs only — never use admin/dashboard links in the site.
export const COMPANY_SOCIALS: readonly SocialLink[] = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/136103988/' },
  { id: 'twitter', label: 'X', href: 'https://x.com/pinnx_ai' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/pinnx_ai/' },
  { id: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@pinnx_ai' },
] as const
