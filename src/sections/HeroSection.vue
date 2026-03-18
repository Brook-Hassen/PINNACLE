<script setup lang="ts">
import RubiksCubeMini from '@/components/RubiksCubeMini.vue'
import SiteContainer from '@/components/SiteContainer.vue'
import { Button } from '@/components/ui/button'
</script>

<template>
  <section id="home" class="py-12 sm:py-16">
    <SiteContainer>
      <div class="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <h1 class="text-5xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Systems<br />
            That Scale.<br />
            Designs That<br />
            Convert.
          </h1>
          <p class="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Stop Settling For Fragmented Tools. We Provide An Integrated Suite Of Development, Creative,
            And Consulting Services Designed To Automate Your Workflow And Accelerate Your Market
            Dominance.
          </p>
          <div class="mt-8">
            <RouterLink to="/get-started" class="inline-flex">
              <Button
                size="lg"
                class="rounded-full border border-border bg-card px-8 text-base font-semibold text-foreground hover:bg-accent"
              >
                Get Started
              </Button>
            </RouterLink>
          </div>
        </div>

        <div class="relative mx-auto hidden h-[410px] w-[630px] lg:block">
          <RubiksCubeMini class="h-full w-full" />
        </div>
      </div>
    </SiteContainer>
  </section>
</template>
