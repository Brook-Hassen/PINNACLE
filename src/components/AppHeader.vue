<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Menu, X, ArrowRight } from 'lucide-vue-next'
import logoMark from '@/assets/brand/pinnacle_logomark.svg'
import { APP_NAME, NAV_HEADER_LINKS } from '@/constants'
import { isNavLinkActive, isHomeSectionLink, navTargetFor, resolveActiveHomeSection } from '@/lib'

const route = useRoute()
const scrolled = ref(false)
const menuOpen = ref(false)
const menuTriggerRef = ref<HTMLButtonElement | null>(null)
const scrollTick = ref(0)

const SCROLL_TOP_THRESHOLD = 12
const HEADER_OFFSET = 88
const SECTION_TRIGGER_OFFSET = 32

const activeSectionId = computed(() => {
  // Bumped on every scroll so this recomputes with the latest window.scrollY.
  scrollTick.value

  if (route.name !== 'home' || typeof window === 'undefined') {
    return ''
  }

  return resolveActiveHomeSection({
    scrollY: window.scrollY,
    headerOffset: HEADER_OFFSET,
    sectionTriggerOffset: SECTION_TRIGGER_OFFSET,
  })
})

const scheduleScrollSpy = (): void => {
  scrollTick.value++
}

const syncScrollSpyAfterNav = (): void => {
  scheduleScrollSpy()
  window.setTimeout(scheduleScrollSpy, 450)
}

watch(
  () => route.fullPath,
  async () => {
    if (route.name === 'home') {
      await nextTick()
      syncScrollSpyAfterNav()
    } else {
      scheduleScrollSpy()
    }
  },
)

const onScroll = () => {
  scrolled.value = window.scrollY > SCROLL_TOP_THRESHOLD
  scheduleScrollSpy()
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && menuOpen.value) {
    menuOpen.value = false
  }
}

watch(menuOpen, async (open, wasOpen) => {
  if (!open && wasOpen) {
    await nextTick()
    menuTriggerRef.value?.focus()
  }
})

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  if (route.name === 'home') scheduleScrollSpy()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
})

const HEADER_NAV_LINKS = NAV_HEADER_LINKS

const isActive = (link: (typeof HEADER_NAV_LINKS)[number]): boolean => {
  if (route.name !== 'home') {
    return isNavLinkActive(link, route)
  }

  // Home uses `/` (not `/#home`), so include it in scroll-spy matching.
  // Otherwise `isNavLinkActive` keeps Home lit whenever the hash is empty,
  // even while Work/Services/Impact are active from scroll position.
  if (link.to === '/' || isHomeSectionLink(link.to)) {
    return link.id === activeSectionId.value
  }

  return isNavLinkActive(link, route)
}
</script>

<template>
  <header
    class="sticky top-0 z-40 transition-all duration-300"
    :class="scrolled ? 'glass border-b' : 'border-b border-transparent bg-transparent backdrop-blur-sm'"
  >
    <nav class="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between gap-4">
        <RouterLink to="/" aria-label="Go to home" class="flex items-center gap-2 font-semibold text-foreground">
          <img :src="logoMark" alt="PINNACLE AI logo" class="h-6 w-6 shrink-0" width="24" height="24" />
          <span class="hidden text-lg leading-none sm:block">{{ APP_NAME }}</span>
        </RouterLink>

        <ul class="hidden items-center gap-8 lg:flex xl:gap-10">
          <li v-for="link in HEADER_NAV_LINKS" :key="link.id">
            <RouterLink
              :to="navTargetFor(link)"
              class="relative inline-flex items-center rounded-lg px-1 py-2 text-sm font-medium tracking-wide transition-colors duration-200"
              :class="
                isActive(link)
                  ? 'text-[var(--accent-soft-hex)]'
                  : 'text-white hover:bg-card/60 hover:text-[var(--accent-soft-hex)]'
              "
            >
              {{ link.label }}
              <span
                v-if="isActive(link)"
                class="absolute bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-[var(--accent-soft-hex)]"
                aria-hidden="true"
              />
            </RouterLink>
          </li>
        </ul>

        <div class="flex items-center gap-2">
          <div class="hidden sm:block">
            <RouterLink to="/get-started" class="btn-soft-pill group">
              Get Started
              <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </RouterLink>
          </div>
          <button
            ref="menuTriggerRef"
            type="button"
            class="flex h-11 w-11 touch-manipulation items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-card/60 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-glow-hex)] lg:hidden"
            :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
            :aria-expanded="menuOpen"
            aria-controls="primary-mobile-nav"
            aria-haspopup="menu"
            @click="menuOpen = !menuOpen"
          >
            <X v-if="menuOpen" class="h-5 w-5" />
            <Menu v-else class="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>

    <div
      v-if="menuOpen"
      id="primary-mobile-nav"
      class="anim-slide-down glass border-t border-border lg:hidden"
    >
      <nav class="mx-auto max-w-7xl space-y-2 px-4 py-3 sm:px-6">
        <RouterLink
          v-for="link in HEADER_NAV_LINKS"
          :key="link.id"
          :to="navTargetFor(link)"
          class="flex min-h-11 touch-manipulation items-center gap-2 rounded-xl px-3 py-3 text-sm font-medium transition-colors"
          :class="
            isActive(link)
              ? 'bg-[var(--accent-dim)] text-[var(--accent-glow-hex)]'
              : 'text-white hover:bg-card/60 hover:text-[var(--accent-soft-hex)]'
          "
          @click="menuOpen = false"
        >
          {{ link.label }}
        </RouterLink>
        <div class="pt-2">
          <RouterLink to="/get-started" class="btn-primary-pill group w-full" @click="menuOpen = false">
            Get Started
            <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </RouterLink>
        </div>
      </nav>
    </div>
  </header>
</template>
