import { computed, reactive, ref, type ComputedRef } from 'vue'

import type { ContactFormState } from '@/types'
import { sendContactMessage } from '@/lib'

interface UseContactForm {
  state: ContactFormState
  isValid: ComputedRef<boolean>
  submit: () => Promise<void>
  reset: () => void
}

/**
 * Manages contact form state, lightweight validation, and submit lifecycle.
 * Returns typed state with submit and reset handlers for UI components.
 */
export function useContactForm(): UseContactForm {
  const state = reactive<ContactFormState>({
    values: {
      name: '',
      email: '',
      message: '',
    },
    isSubmitting: false,
    isSuccess: false,
    error: '',
  })

  const emailPattern = ref<RegExp>(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)

  const isValid = computed<boolean>(() => {
    return (
      state.values.name.trim().length > 1 &&
      emailPattern.value.test(state.values.email.trim()) &&
      state.values.message.trim().length > 10
    )
  })

  const reset = (): void => {
    state.values.name = ''
    state.values.email = ''
    state.values.message = ''
    state.isSuccess = false
    state.error = ''
  }

  const submit = async (): Promise<void> => {
    state.error = ''
    state.isSuccess = false

    if (!isValid.value) {
      state.error = 'Please complete all fields with valid information.'
      return
    }

    state.isSubmitting = true

    try {
      const endpoint = import.meta.env.VITE_CONTACT_API_URL
      const token = import.meta.env.VITE_CONTACT_API_TOKEN

      if (!endpoint) {
        state.error = 'Contact service is not configured yet. Please add VITE_CONTACT_API_URL.'
        return
      }

      const result = await sendContactMessage({
        endpoint,
        token,
        payload: state.values,
      })

      if (!result.success) {
        state.error = result.message
        return
      }

      state.isSuccess = true
      reset()
      state.isSuccess = true
    } catch {
      state.error = 'Something went wrong. Please try again.'
    } finally {
      state.isSubmitting = false
    }
  }

  return { state, isValid, submit, reset }
}
