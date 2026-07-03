<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { ArrowRight, Mail, MessageSquare } from 'lucide-vue-next'
import SiteContainer from '@/components/SiteContainer.vue'
import AuroraBackdrop from '@/components/visuals/AuroraBackdrop.vue'
import BadgePill from '@/components/ui/BadgePill.vue'
import BorderBeam from '@/components/ui/BorderBeam.vue'
import { useContactForm } from '@/composables'
import ContactServicePicker from '@/components/contact/ContactServicePicker.vue'
import ContactMessagingField from '@/components/contact/ContactMessagingField.vue'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { APP_NAME, COMPANY_CONTACT, CONTACT_FORM_SERVICES } from '@/constants'

const siteUrl = import.meta.env.VITE_SITE_URL || ''
useHead({
  title: `Get started | ${APP_NAME}`,
  meta: [
    {
      name: 'description',
      content:
        'Tell us what you are building. A senior partner reads every inbound. We reply within 24 hours.',
    },
    { property: 'og:title', content: `Get started | ${APP_NAME}` },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: siteUrl ? `${siteUrl}/get-started` : undefined },
    { property: 'og:image', content: siteUrl ? `${siteUrl}/og-default.png` : undefined },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: siteUrl ? `${siteUrl}/og-default.png` : undefined },
  ],
  link: siteUrl ? [{ rel: 'canonical', href: `${siteUrl}/get-started` }] : [],
})

const { state, honeypot, turnstileToken, isValid, showFallback, submit, reset, resetCaptcha } =
  useContactForm()

const showOtherServiceField = computed(() => state.values.servicesNeeded.includes('other'))

const contactRails = [
  { icon: Mail, label: 'Email', value: COMPANY_CONTACT.email },
  { icon: MessageSquare, label: 'Response time', value: COMPANY_CONTACT.responseTime },
] as const

const TURNSTILE_SCRIPT_ID = 'cf-turnstile-script'
const TURNSTILE_SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onPinnacleTurnstileLoad&render=explicit'

const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY ?? ''
const turnstileEnabled = computed<boolean>(() => Boolean(turnstileSiteKey))

// True only after the captcha widget has produced a token (or if captcha is disabled in dev).
const captchaReady = computed<boolean>(
  () => !turnstileEnabled.value || turnstileToken.value.length > 0,
)

const widgetEl = ref<HTMLDivElement | null>(null)
let widgetId: string | null = null

const renderWidget = (): void => {
  if (!turnstileEnabled.value || !window.turnstile || !widgetEl.value) return
  // Avoid double-render if mounted twice (HMR / quick re-nav).
  if (widgetId) {
    try {
      window.turnstile.remove(widgetId)
    } catch {
      // ignore — widget may have been auto-removed
    }
    widgetId = null
  }
  widgetId = window.turnstile.render(widgetEl.value, {
    sitekey: turnstileSiteKey,
    theme: 'dark',
    callback: (token: string) => {
      turnstileToken.value = token
    },
    'error-callback': () => {
      turnstileToken.value = ''
    },
    'expired-callback': () => {
      turnstileToken.value = ''
    },
  })
}

const loadTurnstileScript = (): void => {
  if (!turnstileEnabled.value) return
  if (document.getElementById(TURNSTILE_SCRIPT_ID)) {
    // Script already present; widget will render on the existing onload callback,
    // or if the API is already available, render directly.
    if (window.turnstile) renderWidget()
    return
  }

  // Global onload — Turnstile calls this when the API is ready.
  window.onPinnacleTurnstileLoad = () => {
    renderWidget()
  }

  const script = document.createElement('script')
  script.id = TURNSTILE_SCRIPT_ID
  script.src = TURNSTILE_SCRIPT_SRC
  script.async = true
  script.defer = true
  document.head.appendChild(script)
}

const handleReset = (): void => {
  reset()
  resetCaptcha()
  if (widgetId && window.turnstile) {
    try {
      window.turnstile.reset(widgetId)
    } catch {
      // ignore
    }
  }
}

onMounted(() => {
  loadTurnstileScript()
})

onBeforeUnmount(() => {
  if (widgetId && window.turnstile) {
    try {
      window.turnstile.remove(widgetId)
    } catch {
      // ignore
    }
  }
  widgetId = null
})
</script>

<template>
  <section class="section-y route-fade relative overflow-hidden">
    <AuroraBackdrop variant="soft" />

    <SiteContainer class="relative z-10">
      <div class="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div class="anim-fade-up" style="animation-delay: 0s">
          <BadgePill>Start a project</BadgePill>
          <h1
            class="mt-4 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl"
          >
            Tell us what you're
            <span class="gradient-text">building.</span>
          </h1>
          <p class="mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Send us a brief, no matter how big or small the ask. A senior partner reads every
            inbound.
          </p>

          <ul class="mt-8 space-y-4">
            <li
              v-for="rail in contactRails"
              :key="rail.label"
              class="flex items-center gap-3 text-sm text-muted-foreground sm:text-base"
            >
              <span class="icon-badge !h-10 !w-10">
                <component :is="rail.icon" class="h-4 w-4" />
              </span>
              <div>
                <p class="text-xs uppercase tracking-[0.14em] text-[var(--text-subtle-hex)]">
                  {{ rail.label }}
                </p>
                <p class="text-foreground">{{ rail.value }}</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="anim-fade-up" style="animation-delay: 0.15s">
          <BorderBeam>
            <div class="relative overflow-hidden p-6 sm:p-8">
              <div class="noise rounded-[1.5rem]" aria-hidden="true" />
              <div class="relative z-10">
                <p class="section-tag mb-2">Brief us</p>
                <h2 class="text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                  Send your brief
                </h2>

                <form class="contact-form mt-6 space-y-4" @submit.prevent="submit">
                  <div class="contact-field space-y-2">
                    <label for="name" class="contact-label">Name</label>
                    <Input
                      id="name"
                      v-model="state.values.name"
                      autocomplete="name"
                      class="contact-input"
                    />
                  </div>

                  <div class="contact-field space-y-2">
                    <label for="email" class="contact-label">Email</label>
                    <Input
                      id="email"
                      v-model="state.values.email"
                      type="email"
                      autocomplete="email"
                      class="contact-input"
                    />
                  </div>

                  <ContactMessagingField
                    v-model:channel="state.values.messagingChannel"
                    v-model:contact="state.values.messagingContact"
                    :disabled="state.isSubmitting"
                  />

                  <div class="contact-field space-y-2">
                    <span id="services-needed-label" class="contact-label">Services needed</span>
                    <ContactServicePicker
                      v-model="state.values.servicesNeeded"
                      :options="CONTACT_FORM_SERVICES"
                      :disabled="state.isSubmitting"
                      aria-labelledby="services-needed-label"
                    />
                  </div>

                  <div v-if="showOtherServiceField" class="contact-field space-y-2">
                    <label for="other-service" class="contact-label">Describe the other service</label>
                    <Input
                      id="other-service"
                      v-model="state.values.otherServiceDetail"
                      autocomplete="off"
                      placeholder="e.g. Podcast editing, packaging design, event branding…"
                      class="contact-input"
                    />
                  </div>

                  <div class="contact-field space-y-2">
                    <label for="message" class="contact-label">Project details</label>
                    <Textarea
                      id="message"
                      v-model="state.values.message"
                      rows="5"
                      class="contact-input min-h-[8rem] resize-y"
                    />
                  </div>

                  <!-- Honeypot — visually hidden, hidden from AT, bots fill it. -->
                  <div aria-hidden="true" class="contact-honeypot">
                    <label for="company">Company (leave empty)</label>
                    <input
                      id="company"
                      v-model="honeypot.value"
                      type="text"
                      tabindex="-1"
                      autocomplete="off"
                      name="company"
                    />
                  </div>

                  <!-- Cloudflare Turnstile widget mounts here when configured. -->
                  <div v-if="turnstileEnabled" ref="widgetEl" class="cf-turnstile-mount pt-2" />

                  <p v-if="state.error" class="text-sm text-destructive">{{ state.error }}</p>
                  <!-- Surfaced only when the API signals an upstream or service failure,
                       so the user always has a working channel to reach the team. -->
                  <p
                    v-if="showFallback"
                    class="text-sm leading-relaxed text-muted-foreground"
                  >
                    You can also email us at
                    <a
                      :href="`mailto:${COMPANY_CONTACT.email}?subject=${encodeURIComponent('Project inquiry')}`"
                      class="font-medium text-[color:var(--accent-soft-hex)] underline-offset-2 hover:underline"
                    >
                      {{ COMPANY_CONTACT.email }}
                    </a>
                    while the form is down.
                  </p>
                  <p
                    v-if="state.isSuccess"
                    class="text-sm font-medium text-[var(--accent-glow-hex)]"
                  >
                    Thanks for writing. We will get back to you shortly.
                  </p>

                  <div class="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
                    <button
                      type="submit"
                      :disabled="state.isSubmitting || !isValid || !captchaReady"
                      class="btn-primary-pill group w-full sm:w-auto"
                    >
                      {{ state.isSubmitting ? 'Sending…' : 'Send Message' }}
                      <ArrowRight
                        v-if="!state.isSubmitting"
                        class="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      />
                    </button>
                    <button type="button" class="btn-soft-pill w-full sm:w-auto" @click="handleReset">Reset</button>
                  </div>
                </form>
              </div>
            </div>
          </BorderBeam>
        </div>
      </div>
    </SiteContainer>
  </section>
</template>

<style scoped>
.contact-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-hex);
  letter-spacing: 0.01em;
}

.contact-form :deep(.contact-input) {
  min-height: 2.75rem;
  font-size: 1rem;
  border-color: var(--border-soft);
  background: rgba(19, 27, 26, 0.6);
  transition:
    border-color 0.25s var(--ease-out-premium),
    box-shadow 0.3s var(--ease-out-premium),
    background-color 0.25s var(--ease-out-premium);
}

.contact-form :deep(.contact-input:focus-visible) {
  border-color: rgba(43, 191, 184, 0.45);
  background: rgba(19, 27, 26, 0.85);
  box-shadow:
    0 0 0 3px rgba(43, 191, 184, 0.12),
    0 0 22px rgba(43, 191, 184, 0.1);
}

/* Honeypot: visually hidden but reachable by automated form fillers. */
.contact-honeypot {
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.cf-turnstile-mount {
  max-width: 100%;
  overflow-x: auto;
}
</style>
