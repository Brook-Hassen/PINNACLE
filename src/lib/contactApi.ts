import { COMPANY_CONTACT } from '@/constants/company'
import { CONTACT_FORM_SERVICES } from '@/constants/contactForm'
import type { ContactFormPayload } from '@/types'

export interface ContactApiSuccessResponse {
  success: true
  message: string
}

export type ContactApiErrorCode =
  | 'service_unavailable'
  | 'upstream_error'
  | 'internal_error'
  | 'network_error'

export interface ContactApiErrorResponse {
  success: false
  message: string
  code?: ContactApiErrorCode
}

export type ContactApiResponse = ContactApiSuccessResponse | ContactApiErrorResponse

interface SendContactMessageOptions {
  payload: ContactFormPayload
}

const SERVICE_LABELS = Object.fromEntries(
  CONTACT_FORM_SERVICES.map((service) => [service.id, service.label]),
) as Record<string, string>

export function formatMessagingContact(
  channel: ContactFormPayload['messagingChannel'],
  contact: string,
): string {
  const trimmed = contact.trim()
  if (!trimmed) return 'Not provided'
  if (channel === 'telegram') return `Telegram: ${trimmed}`
  if (channel === 'whatsapp') return `WhatsApp: ${trimmed}`
  return trimmed
}

export function resolveFormspreeEndpoint(): string | null {
  const override = import.meta.env.VITE_CONTACT_API_URL?.trim()
  if (override) return override

  const formId = import.meta.env.VITE_FORMSPREE_FORM_ID?.trim()
  if (!formId) return null

  return `https://formspree.io/f/${formId}`
}

export function buildFormspreeBody(payload: ContactFormPayload) {
  const services = payload.servicesNeeded
    .map((id) => SERVICE_LABELS[id] ?? id)
    .join(', ')

  const body: Record<string, string> = {
    name: payload.name,
    email: payload.email,
    message: payload.message,
    messagingContact: formatMessagingContact(
      payload.messagingChannel,
      payload.messagingContact,
    ),
    servicesNeeded: services,
    _gotcha: payload.honeypot,
    _subject: `New inquiry from ${payload.name}`,
  }

  if (payload.otherServiceDetail) {
    body.otherService = payload.otherServiceDetail
  }

  return body
}

export async function sendContactMessage(
  options: SendContactMessageOptions,
): Promise<ContactApiResponse> {
  if (options.payload.honeypot) {
    return { success: true, message: 'Message sent successfully.' }
  }

  const endpoint = resolveFormspreeEndpoint()
  if (!endpoint) {
    return {
      success: false,
      message: `Contact form is not configured. Please email us at ${COMPANY_CONTACT.email}.`,
      code: 'service_unavailable',
    }
  }

  let response: Response
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(buildFormspreeBody(options.payload)),
    })
  } catch {
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.',
      code: 'network_error',
    }
  }

  let parsed: { ok?: boolean; error?: string; errors?: Array<{ message?: string }> } = {}
  try {
    parsed = (await response.json()) as typeof parsed
  } catch {
    parsed = {}
  }

  if (!response.ok || parsed.ok === false) {
    const detail =
      parsed.error ??
      parsed.errors?.map((entry) => entry.message).filter(Boolean).join(' ') ??
      'Unable to submit your request right now.'

    return {
      success: false,
      message: detail,
      code: response.status >= 500 ? 'upstream_error' : undefined,
    }
  }

  return {
    success: true,
    message: 'Message sent successfully.',
  }
}
