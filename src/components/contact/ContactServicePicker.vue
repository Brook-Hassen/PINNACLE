<script setup lang="ts">
import type { ContactFormServiceOption } from '@/constants/contactForm'

const props = defineProps<{
  modelValue: readonly string[]
  options: readonly ContactFormServiceOption[]
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const isSelected = (id: string): boolean => props.modelValue.includes(id)

const toggle = (id: string): void => {
  if (props.disabled) return
  const next = new Set(props.modelValue)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  emit('update:modelValue', [...next])
}
</script>

<template>
  <fieldset class="contact-service-picker" :disabled="disabled">
    <legend class="sr-only">Services needed</legend>
    <div class="contact-service-picker__grid" role="group" aria-label="Services needed">
      <button
        v-for="option in options"
        :key="option.id"
        type="button"
        class="contact-service-picker__chip"
        :class="{ 'contact-service-picker__chip--active': isSelected(option.id) }"
        :aria-pressed="isSelected(option.id)"
        @click="toggle(option.id)"
      >
        <span class="contact-service-picker__icon" aria-hidden="true">
          <component :is="option.icon" class="h-3 w-3" />
        </span>
        <span class="contact-service-picker__label">{{ option.label }}</span>
      </button>
    </div>
  </fieldset>
</template>

<style scoped>
.contact-service-picker {
  margin: 0;
  padding: 0;
  border: 0;
  min-width: 0;
}

.contact-service-picker__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.contact-service-picker__chip {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 2.75rem;
  max-width: 100%;
  padding: 0.5rem 0.75rem 0.5rem 0.5rem;
  border-radius: 9999px;
  border: 1px solid var(--border-soft);
  background: rgba(19, 27, 26, 0.5);
  color: var(--text-muted-hex);
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.3;
  cursor: pointer;
  touch-action: manipulation;
  transition:
    border-color 0.22s var(--ease-out-premium),
    background-color 0.22s var(--ease-out-premium),
    box-shadow 0.28s var(--ease-out-premium),
    color 0.22s var(--ease-out-premium),
    transform 0.18s var(--ease-out-premium);
}

.contact-service-picker__chip::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    rgba(43, 191, 184, 0.55),
    rgba(88, 224, 210, 0.15) 50%,
    transparent 70%
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s var(--ease-out-premium);
}

.contact-service-picker__chip:hover:not(:disabled) {
  border-color: rgba(43, 191, 184, 0.32);
  background: rgba(19, 27, 26, 0.72);
  color: var(--text-hex);
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
}

.contact-service-picker__chip:focus-visible {
  outline: none;
  border-color: rgba(43, 191, 184, 0.5);
  box-shadow:
    0 0 0 2px rgba(43, 191, 184, 0.14),
    0 0 16px rgba(43, 191, 184, 0.1);
}

.contact-service-picker__chip--active {
  border-color: rgba(43, 191, 184, 0.45);
  background: rgba(17, 100, 102, 0.2);
  color: var(--accent-glow-hex);
  box-shadow:
    0 0 0 1px rgba(43, 191, 184, 0.12),
    0 0 18px rgba(43, 191, 184, 0.12);
}

.contact-service-picker__chip--active::after {
  opacity: 1;
}

.contact-service-picker__chip:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.contact-service-picker__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 1.35rem;
  height: 1.35rem;
  border-radius: 9999px;
  border: 1px solid rgba(43, 191, 184, 0.18);
  background: rgba(17, 100, 102, 0.1);
  color: var(--accent-soft-hex);
  transition:
    border-color 0.22s var(--ease-out-premium),
    background-color 0.22s var(--ease-out-premium),
    color 0.22s var(--ease-out-premium);
}

.contact-service-picker__chip--active .contact-service-picker__icon {
  border-color: rgba(88, 224, 210, 0.4);
  background: rgba(17, 100, 102, 0.32);
  color: var(--accent-glow-hex);
}

.contact-service-picker__label {
  padding-right: 0.1rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
