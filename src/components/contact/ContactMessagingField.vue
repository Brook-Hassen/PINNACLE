<script setup lang="ts">
import { computed } from 'vue'
import { Input } from '@/components/ui/input'
import type { MessagingChannel } from '@/types'

const props = defineProps<{
  channel: MessagingChannel
  contact: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:channel': [value: MessagingChannel]
  'update:contact': [value: string]
}>()

const inputPlaceholder = computed(() => {
  if (props.channel === 'telegram') return '@username'
  if (props.channel === 'whatsapp') return 'Phone number or WhatsApp link'
  return ''
})

const selectChannel = (next: Exclude<MessagingChannel, ''>): void => {
  if (props.disabled) return
  emit('update:channel', next)
  if (props.channel !== next) emit('update:contact', '')
}
</script>

<template>
  <fieldset class="contact-messaging-field" :disabled="disabled">
    <legend class="contact-messaging-field__legend">Reach you faster</legend>

    <div class="contact-messaging-field__choices" role="group" aria-label="Messaging preference">
      <button
        type="button"
        class="contact-messaging-field__chip"
        :class="{ 'contact-messaging-field__chip--active': channel === 'telegram' }"
        :aria-pressed="channel === 'telegram'"
        @click="selectChannel('telegram')"
      >
        Telegram
      </button>
      <button
        type="button"
        class="contact-messaging-field__chip"
        :class="{ 'contact-messaging-field__chip--active': channel === 'whatsapp' }"
        :aria-pressed="channel === 'whatsapp'"
        @click="selectChannel('whatsapp')"
      >
        WhatsApp
      </button>
    </div>

    <div v-if="channel" class="contact-messaging-field__input space-y-2">
      <label for="messaging-contact" class="contact-messaging-field__input-label">
        {{ channel === 'telegram' ? 'Telegram username' : 'WhatsApp number' }}
      </label>
      <Input
        id="messaging-contact"
        :model-value="contact"
        autocomplete="off"
        class="contact-input"
        :placeholder="inputPlaceholder"
        @update:model-value="emit('update:contact', String($event))"
      />
    </div>
  </fieldset>
</template>

<style scoped>
.contact-messaging-field {
  margin: 0;
  padding: 0;
  border: 0;
  min-width: 0;
}

.contact-messaging-field__legend {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-hex);
  letter-spacing: 0.01em;
}

.contact-messaging-field__choices {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.contact-messaging-field__chip {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  padding: 0.5rem 0.9rem;
  border-radius: 9999px;
  border: 1px solid var(--border-soft);
  background: rgba(19, 27, 26, 0.5);
  color: var(--text-muted-hex);
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.2;
  cursor: pointer;
  touch-action: manipulation;
  transition:
    border-color 0.22s var(--ease-out-premium),
    background-color 0.22s var(--ease-out-premium),
    box-shadow 0.28s var(--ease-out-premium),
    color 0.22s var(--ease-out-premium),
    transform 0.18s var(--ease-out-premium);
}

.contact-messaging-field__chip:hover:not(:disabled) {
  border-color: rgba(43, 191, 184, 0.32);
  background: rgba(19, 27, 26, 0.72);
  color: var(--text-hex);
  transform: translateY(-1px);
}

.contact-messaging-field__chip:focus-visible {
  outline: none;
  border-color: rgba(43, 191, 184, 0.5);
  box-shadow:
    0 0 0 2px rgba(43, 191, 184, 0.14),
    0 0 16px rgba(43, 191, 184, 0.1);
}

.contact-messaging-field__chip--active {
  border-color: rgba(43, 191, 184, 0.45);
  background: rgba(17, 100, 102, 0.2);
  color: var(--accent-glow-hex);
  box-shadow:
    0 0 0 1px rgba(43, 191, 184, 0.12),
    0 0 18px rgba(43, 191, 184, 0.12);
}

.contact-messaging-field__chip:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.contact-messaging-field__input {
  margin-top: 0.75rem;
}

.contact-messaging-field__input-label {
  display: block;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-muted-hex);
}
</style>
