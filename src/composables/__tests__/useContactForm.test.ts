import { describe, it, expect, beforeEach, vi } from 'vitest'

// Hoisted mock so the composable picks up our fakes when imported. The real
// modules import side effects we don't want in unit tests.
const sendContactMessage = vi.fn()
const trackEvent = vi.fn()

vi.mock('@/lib', () => ({
  sendContactMessage: (...args: unknown[]) => sendContactMessage(...args),
  trackEvent: (...args: unknown[]) => trackEvent(...args),
}))

// Imported after the mock so the composable resolves @/lib to the stubs.
import { useContactForm } from '@/composables/useContactForm'

const fillValid = (state: ReturnType<typeof useContactForm>['state']) => {
  state.values.name = 'Jane Doe'
  state.values.email = 'jane@example.com'
  state.values.messagingChannel = 'telegram'
  state.values.messagingContact = '@janedoe'
  state.values.servicesNeeded = ['graphics-design', 'web-apps-systems']
  state.values.message = 'Please get in touch about a new project.'
}

describe('useContactForm', () => {
  beforeEach(() => {
    sendContactMessage.mockReset()
    trackEvent.mockReset()
  })

  it('starts with the expected default state', () => {
    const { state, isValid } = useContactForm()
    expect(state.values).toEqual({
      name: '',
      email: '',
      messagingChannel: '',
      messagingContact: '',
      servicesNeeded: [],
      otherServiceDetail: '',
      message: '',
    })
    expect(state.isSubmitting).toBe(false)
    expect(state.isSuccess).toBe(false)
    expect(state.error).toBe('')
    expect(isValid.value).toBe(false)
  })

  it('only marks the form valid when all required fields pass their rules', () => {
    const { state, isValid } = useContactForm()

    state.values.name = 'a'                          // too short
    state.values.email = 'jane@example.com'
    state.values.messagingChannel = 'telegram'
    state.values.messagingContact = '@janedoe'
    state.values.servicesNeeded = ['graphics-design']
    state.values.message = 'Please get in touch.'
    expect(isValid.value).toBe(false)

    state.values.name = 'Jane'
    state.values.email = 'not-an-email'              // bad email
    expect(isValid.value).toBe(false)

    state.values.email = 'jane@example.com'
    state.values.messagingChannel = ''                 // no channel chosen
    expect(isValid.value).toBe(false)

    state.values.messagingChannel = 'telegram'
    state.values.messagingContact = ''                 // missing contact
    expect(isValid.value).toBe(false)

    state.values.messagingContact = '@janedoe'
    state.values.servicesNeeded = []                 // none selected
    expect(isValid.value).toBe(false)

    state.values.servicesNeeded = ['graphics-design']
    state.values.message = 'short'                   // ≤ 10 chars
    expect(isValid.value).toBe(false)

    state.values.message = 'Please get in touch about a project.'
    expect(isValid.value).toBe(true)
  })

  it('blocks submit() with a friendly error when fields are invalid', async () => {
    const { state, submit } = useContactForm()
    await submit()
    expect(state.error).toMatch(/select at least one service|required fields/i)
    expect(sendContactMessage).not.toHaveBeenCalled()
  })

  it('clears values + flips isSuccess and fires the analytics event on success', async () => {
    sendContactMessage.mockResolvedValueOnce({ success: true, message: 'ok' })
    const { state, submit } = useContactForm()

    fillValid(state)
    await submit()

    expect(sendContactMessage).toHaveBeenCalledOnce()
    expect(sendContactMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({
          messagingChannel: 'telegram',
          messagingContact: '@janedoe',
          servicesNeeded: ['graphics-design', 'web-apps-systems'],
        }),
      }),
    )
    expect(state.isSuccess).toBe(true)
    // reset() runs inside the success path
    expect(state.values).toEqual({
      name: '',
      email: '',
      messagingChannel: '',
      messagingContact: '',
      servicesNeeded: [],
      otherServiceDetail: '',
      message: '',
    })
    expect(trackEvent).toHaveBeenCalledWith('Contact form submit')
  })

  it('surfaces the server message + tracks an error event on a failed response', async () => {
    sendContactMessage.mockResolvedValueOnce({ success: false, message: 'Spam check failed.' })
    const { state, submit } = useContactForm()

    fillValid(state)
    await submit()

    expect(state.error).toBe('Spam check failed.')
    expect(state.isSuccess).toBe(false)
    expect(trackEvent).toHaveBeenCalledWith(
      'Contact form error',
      expect.objectContaining({ reason: expect.stringContaining('Spam check failed') }),
    )
  })

  it('reset() clears values and error but does not touch the success flag', () => {
    const { state, reset } = useContactForm()
    state.values.name = 'Jane'
    state.values.email = 'jane@example.com'
    state.values.messagingChannel = 'whatsapp'
    state.values.messagingContact = '+251912345678'
    state.values.servicesNeeded = ['business-consultation']
    state.values.message = 'Hello there everyone'
    state.error = 'old error'
    state.isSuccess = true

    reset()

    expect(state.values).toEqual({
      name: '',
      email: '',
      messagingChannel: '',
      messagingContact: '',
      servicesNeeded: [],
      otherServiceDetail: '',
      message: '',
    })
    expect(state.error).toBe('')
    expect(state.isSuccess).toBe(true)
  })
})
