import type { Component } from 'vue'
import {
  Briefcase,
  Clapperboard,
  Layers,
  Megaphone,
  MonitorSmartphone,
  SwatchBook,
} from 'lucide-vue-next'

export interface ContactFormServiceOption {
  id: string
  label: string
  icon: Component
}

/** Ordered options for the lead-qualification contact form. */
export const CONTACT_FORM_SERVICES: readonly ContactFormServiceOption[] = [
  { id: 'graphics-design', label: 'Graphics Design', icon: SwatchBook },
  { id: 'video-photo-editing', label: 'Video & Photo Editing', icon: Clapperboard },
  { id: 'web-apps-systems', label: 'Web, Apps & Systems', icon: MonitorSmartphone },
  { id: 'business-consultation', label: 'Business Consultation', icon: Briefcase },
  { id: 'social-media-management', label: 'Social Media Management', icon: Megaphone },
  { id: 'other', label: 'Other', icon: Layers },
] as const

export const CONTACT_FORM_SERVICE_IDS = new Set(
  CONTACT_FORM_SERVICES.map((service) => service.id),
)
