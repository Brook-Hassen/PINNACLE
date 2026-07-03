export type MessagingChannel = '' | 'telegram' | 'whatsapp'

export interface ContactFormInput {
  name: string
  email: string
  /** Telegram or WhatsApp — required faster contact channel. */
  messagingChannel: MessagingChannel
  /** User-provided @username, phone number, or link for the selected channel. */
  messagingContact: string
  /** Selected service ids from the contact form picker. */
  servicesNeeded: string[]
  /** Required when "Other" is selected — describes the work they need. */
  otherServiceDetail: string
  message: string
}

export interface ContactFormPayload extends ContactFormInput {
  // Empty when submitted by a human. Bots fill all fields.
  honeypot: string
  // Cloudflare Turnstile token (verified server-side).
  turnstileToken: string
}

export interface ContactFormState {
  values: ContactFormInput
  isSubmitting: boolean
  isSuccess: boolean
  error: string
}
