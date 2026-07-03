import { computed, reactive, ref, type ComputedRef } from 'vue'

import type { ContactFormPayload, ContactFormState } from '@/types'
import { sendContactMessage, trackEvent } from '@/lib'
import type { ContactApiErrorCode } from '@/lib/contactApi'

interface UseContactForm {
  state: ContactFormState
  honeypot: { value: string }
  turnstileToken: { value: string }
  isValid: ComputedRef<boolean>
  /**
   * True when the last submission failed in a way the user cannot recover from
   * on this device (service unavailable or upstream error). The view uses this
   * to surface the `mailto:` fallback rail.
   */
  showFallback: ComputedRef<boolean>
  submit: () => Promise<void>
  reset: () => void
  resetCaptcha: () => void
}

/**
 * Manages contact form state, lightweight client validation, and the
 * submit lifecycle. Submissions are sent to Formspree when configured.
 */
export function useContactForm(): UseContactForm {
  const state = reactive<ContactFormState>({
    values: {
      name: '',
      email: '',
      messagingChannel: '',
      messagingContact: '',
      servicesNeeded: [],
      otherServiceDetail: '',
      message: '',
    },
    isSubmitting: false,
    isSuccess: false,
    error: '',
  })

  // Held outside `state.values` so they never bind to visible inputs.
  const honeypot = reactive({ value: '' })
  const turnstileToken = reactive({ value: '' })

  const emailPattern = ref<RegExp>(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)

  // Last failure code surfaced to the view for fallback-rail gating.
  const lastErrorCode = ref<ContactApiErrorCode | null>(null)
  const FALLBACK_CODES: ReadonlySet<ContactApiErrorCode> = new Set([
    'service_unavailable',
    'upstream_error',
    'internal_error',
  ])
  const showFallback = computed<boolean>(() =>
    lastErrorCode.value !== null && FALLBACK_CODES.has(lastErrorCode.value),
  )

  const needsOtherDetail = computed<boolean>(() =>
    state.values.servicesNeeded.includes('other'),
  )

  const isValid = computed<boolean>(() => {
    const hasMessagingChannel =
      state.values.messagingChannel === 'telegram' ||
      state.values.messagingChannel === 'whatsapp'

    const otherDetailValid =
      !needsOtherDetail.value || state.values.otherServiceDetail.trim().length > 2

    return (
      state.values.name.trim().length > 1 &&
      emailPattern.value.test(state.values.email.trim()) &&
      hasMessagingChannel &&
      state.values.messagingContact.trim().length > 0 &&
      state.values.servicesNeeded.length > 0 &&
      otherDetailValid &&
      state.values.message.trim().length > 10
    )
  })

  const reset = (): void => {
    state.values.name = ''
    state.values.email = ''
    state.values.messagingChannel = ''
    state.values.messagingContact = ''
    state.values.servicesNeeded = []
    state.values.otherServiceDetail = ''
    state.values.message = ''
    state.error = ''
  }

  const resetCaptcha = (): void => {
    turnstileToken.value = ''
  }

  const submit = async (): Promise<void> => {
    state.error = ''
    state.isSuccess = false
    lastErrorCode.value = null

    if (!isValid.value) {
      if (state.values.servicesNeeded.length === 0) {
        state.error = 'Please select at least one service and complete all required fields.'
      } else if (needsOtherDetail.value && state.values.otherServiceDetail.trim().length <= 2) {
        state.error = 'Please describe the other service you need.'
      } else if (
        state.values.messagingChannel !== 'telegram' &&
        state.values.messagingChannel !== 'whatsapp'
      ) {
        state.error = 'Please choose Telegram or WhatsApp and enter your contact details.'
      } else if (state.values.messagingContact.trim().length === 0) {
        state.error = 'Please enter your Telegram username or WhatsApp number.'
      } else {
        state.error = 'Please fill in all required fields with valid information.'
      }
      return
    }

    state.isSubmitting = true

    try {
      const payload: ContactFormPayload = {
        name: state.values.name.trim(),
        email: state.values.email.trim(),
        messagingChannel: state.values.messagingChannel,
        messagingContact: state.values.messagingContact.trim(),
        servicesNeeded: [...state.values.servicesNeeded],
        otherServiceDetail: state.values.otherServiceDetail.trim(),
        message: state.values.message.trim(),
        honeypot: honeypot.value,
        turnstileToken: turnstileToken.value,
      }

      const result = await sendContactMessage({ payload })

      if (!result.success) {
        state.error = result.message
        lastErrorCode.value = result.code ?? null
        trackEvent('Contact form error', {
          reason: result.message.slice(0, 80),
          code: result.code ?? 'unknown',
        })
        return
      }

      reset()
      state.isSuccess = true
      trackEvent('Contact form submit')
    } catch {
      state.error = 'Something went wrong. Please try again.'
      lastErrorCode.value = 'internal_error'
      trackEvent('Contact form error', { reason: 'exception', code: 'internal_error' })
    } finally {
      state.isSubmitting = false
    }
  }

  return { state, honeypot, turnstileToken, isValid, showFallback, submit, reset, resetCaptcha }
}
