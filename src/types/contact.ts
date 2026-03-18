export interface ContactFormInput {
  name: string
  email: string
  message: string
}

export interface ContactFormState {
  values: ContactFormInput
  isSubmitting: boolean
  isSuccess: boolean
  error: string
}
