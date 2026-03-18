import type { ContactFormInput } from '@/types'

export interface ContactApiSuccessResponse {
  success: true
  message: string
}

export interface ContactApiErrorResponse {
  success: false
  message: string
}

export type ContactApiResponse = ContactApiSuccessResponse | ContactApiErrorResponse

interface SendContactMessageOptions {
  endpoint: string
  token: string
  payload: ContactFormInput
}

export async function sendContactMessage(
  options: SendContactMessageOptions,
): Promise<ContactApiResponse> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`
  }

  const response = await fetch(options.endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(options.payload),
  })

  let parsed: { message?: string } = {}

  try {
    parsed = (await response.json()) as { message?: string }
  } catch {
    parsed = {}
  }

  if (!response.ok) {
    return {
      success: false,
      message: parsed.message ?? 'Unable to submit your request right now.',
    }
  }

  return {
    success: true,
    message: parsed.message ?? 'Message sent successfully.',
  }
}
