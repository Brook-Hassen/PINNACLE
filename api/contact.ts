import type { VercelRequest, VercelResponse } from '@vercel/node'

interface RawContactPayload {
  name?: unknown
  email?: unknown
  messagingChannel?: unknown
  messagingContact?: unknown
  servicesNeeded?: unknown
  otherServiceDetail?: unknown
  message?: unknown
  honeypot?: unknown
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const NAME_MIN = 2
const MESSAGE_MIN = 10
const MESSAGE_MAX = 5000
const MESSAGING_CONTACT_MAX = 120
const THROTTLE_MS = 30_000
const FALLBACK_EMAIL = 'contact@pinnxai.com'

const ALLOWED_SERVICE_IDS = new Set([
  'graphics-design',
  'video-photo-editing',
  'web-apps-systems',
  'business-consultation',
  'social-media-management',
  'other',
])

const SERVICE_LABELS: Record<string, string> = {
  'graphics-design': 'Graphics Design',
  'video-photo-editing': 'Video & Photo Editing',
  'web-apps-systems': 'Web, Apps & Systems',
  'business-consultation': 'Business Consultation',
  'social-media-management': 'Social Media Management',
  other: 'Other',
}

const recent = new Map<string, number>()

function parseServicesNeeded(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  const unique = new Set<string>()
  for (const item of value) {
    if (typeof item !== 'string') continue
    const id = item.trim()
    if (ALLOWED_SERVICE_IDS.has(id)) unique.add(id)
  }
  return [...unique]
}

function getClientIp(req: VercelRequest): string {
  const fwd = req.headers['x-forwarded-for']
  if (typeof fwd === 'string') return fwd.split(',')[0]?.trim() || 'unknown'
  if (Array.isArray(fwd) && fwd[0]) return fwd[0].split(',')[0]?.trim() || 'unknown'
  return req.socket?.remoteAddress ?? 'unknown'
}

function formatMessagingContact(channel: string, contact: string): string {
  const trimmed = contact.trim()
  if (!trimmed) return 'Not provided'
  if (channel === 'telegram') return `Telegram: ${trimmed}`
  if (channel === 'whatsapp') return `WhatsApp: ${trimmed}`
  return trimmed
}

function parseMessagingChannel(value: unknown): '' | 'telegram' | 'whatsapp' {
  if (value === 'telegram' || value === 'whatsapp') return value
  return ''
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({ success: false, message: 'Method not allowed.' })
    return
  }

  const ip = getClientIp(req)
  const now = Date.now()
  const last = recent.get(ip) ?? 0
  if (now - last < THROTTLE_MS) {
    res.status(429).json({
      success: false,
      message: 'You are sending messages too quickly. Please wait a moment and try again.',
    })
    return
  }

  const body = (req.body ?? {}) as RawContactPayload
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const messagingChannel = parseMessagingChannel(body.messagingChannel)
  const messagingContact =
    typeof body.messagingContact === 'string' ? body.messagingContact.trim() : ''
  const servicesNeeded = parseServicesNeeded(body.servicesNeeded)
  const otherServiceDetail =
    typeof body.otherServiceDetail === 'string' ? body.otherServiceDetail.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''
  const honeypot = typeof body.honeypot === 'string' ? body.honeypot : ''

  if (honeypot) {
    res.status(200).json({ success: true, message: 'Message sent successfully.' })
    return
  }

  if (
    name.length < NAME_MIN ||
    !EMAIL_RE.test(email) ||
    (messagingChannel !== 'telegram' && messagingChannel !== 'whatsapp') ||
    messagingContact.length === 0 ||
    servicesNeeded.length === 0 ||
    (servicesNeeded.includes('other') && otherServiceDetail.length <= 2) ||
    message.length < MESSAGE_MIN ||
    message.length > MESSAGE_MAX ||
    messagingContact.length > MESSAGING_CONTACT_MAX
  ) {
    res.status(400).json({
      success: false,
      message: 'Please fill in all required fields with valid information.',
    })
    return
  }

  const formId = process.env.FORMSPREE_FORM_ID?.trim()
  if (!formId) {
    res.status(502).json({
      success: false,
      message: `Contact form is not configured. Please email us directly at ${FALLBACK_EMAIL}.`,
      code: 'service_unavailable',
    })
    return
  }

  try {
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message,
        messagingContact: formatMessagingContact(messagingChannel, messagingContact),
        servicesNeeded: servicesNeeded.map((id) => SERVICE_LABELS[id] ?? id).join(', '),
        ...(otherServiceDetail ? { otherService: otherServiceDetail } : {}),
        _subject: `New inquiry from ${name}`,
      }),
    })

    let parsed: { ok?: boolean; error?: string } = {}
    try {
      parsed = (await response.json()) as typeof parsed
    } catch {
      parsed = {}
    }

    if (!response.ok || parsed.ok === false) {
      res.status(502).json({
        success: false,
        message:
          parsed.error ??
          `Unable to send your message right now. Please email us directly at ${FALLBACK_EMAIL}.`,
        code: 'upstream_error',
      })
      return
    }

    recent.set(ip, now)
    res.status(200).json({ success: true, message: 'Message sent successfully.' })
  } catch (err) {
    console.error(
      JSON.stringify({
        event: 'contact_api.exception',
        error: err instanceof Error ? err.message : String(err),
        ip,
      }),
    )
    res.status(500).json({ success: false, message: 'Unexpected error.', code: 'internal_error' })
  }
}
