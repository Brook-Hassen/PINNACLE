<script setup lang="ts">
import SiteContainer from '@/components/SiteContainer.vue'
import { useContactForm } from '@/composables'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const { state, isValid, submit, reset } = useContactForm()
</script>

<template>
  <section class="py-16 sm:py-20">
    <SiteContainer>
      <Card class="mx-auto max-w-3xl border-border bg-card text-card-foreground">
        <CardHeader class="space-y-3">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">Get Started</p>
          <CardTitle class="text-3xl">Start your growth project with PINNACLE AI</CardTitle>
          <p class="text-sm leading-relaxed text-muted-foreground">
            Whether you need technical support, strategic guidance, or end-to-end execution, send us a
            message and we will respond quickly.
          </p>
        </CardHeader>
        <CardContent>
          <form class="space-y-4" @submit.prevent="submit">
            <div class="space-y-2">
              <label for="name" class="text-sm font-medium">Name</label>
              <Input id="name" v-model="state.values.name" autocomplete="name" class="bg-background" />
            </div>

            <div class="space-y-2">
              <label for="email" class="text-sm font-medium">Email</label>
              <Input
                id="email"
                v-model="state.values.email"
                type="email"
                autocomplete="email"
                class="bg-background"
              />
            </div>

            <div class="space-y-2">
              <label for="message" class="text-sm font-medium">Message</label>
              <Textarea id="message" v-model="state.values.message" rows="6" class="bg-background" />
            </div>

            <p v-if="state.error" class="text-sm text-destructive">{{ state.error }}</p>
            <p v-if="state.isSuccess" class="text-sm text-emerald-600">
              Thanks for reaching out. We will contact you shortly.
            </p>

            <div class="flex flex-wrap gap-3">
              <Button type="submit" :disabled="state.isSubmitting || !isValid">
                {{ state.isSubmitting ? 'Sending...' : 'Send Message' }}
              </Button>
              <Button type="button" variant="secondary" @click="reset">Reset</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </SiteContainer>
  </section>
</template>
