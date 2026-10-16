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

let scrollFrame = 0

const activeSectionId = computed(() => {
  // Read scrollTick so this recomputes on scroll without unused-expression lint.
  const tick = scrollTick.value

  if (route.name !== 'home' || typeof window === 'undefined') {
    return ''
  }

  return resolveActiveHomeSection({
    scrollY: window.scrollY,
    headerOffset: HEADER_OFFSET,
    sectionTriggerOffset: SECTION_TRIGGER_OFFSET + (tick && 0),
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
  if (scrollFrame) return
  scrollFrame = window.requestAnimationFrame(() => {
    scrollFrame = 0
    scrolled.value = window.scrollY > SCROLL_TOP_THRESHOLD
    scheduleScrollSpy()
  })
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
  if (scrollFrame) window.cancelAnimationFrame(scrollFrame)
})

const HEADER_NAV_LINKS = NAV_HEADER_LINKS

const isActive = (link: (typeof HEADER_NAV_LINKS)[number]): boolean => {
  if (route.name !== 'home') {
    return isNavLinkActive(link, route)
  }

  if (link.to === '/' || isHomeSectionLink(link.to)) {
    return link.id === activeSectionId.value
  }

  return isNavLinkActive(link, route)
}
</script>

<template>
  <!-- Fixed overlay so the page (hero aurora, sections) shows through — not a solid black strip -->
  <header
    class="site-header fixed inset-x-0 top-0 z-40"
    :class="scrolled || menuOpen ? 'site-header--scrolled' : 'site-header--top'"
  >
    <nav
      class="site-header__inner mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      :class="scrolled ? 'h-14' : 'h-16'"
    >
      <RouterLink
        to="/"
        aria-label="Go to home"
        class="site-header__brand group flex items-center gap-2.5 text-foreground"
      >
        <img
          :src="logoMark"
          alt=""
          class="h-5 w-5 shrink-0 opacity-90 transition-opacity group-hover:opacity-100"
          width="20"
          height="20"
        />
        <span class="hidden text-[0.95rem] leading-none sm:block sm:text-base">{{ APP_NAME }}</span>
      </RouterLink>

      <ul class="hidden items-center gap-1 lg:flex">
        <li v-for="link in HEADER_NAV_LINKS" :key="link.id">
          <RouterLink
            :to="navTargetFor(link)"
            class="site-header__link relative inline-flex items-center px-3 py-2"
            :class="isActive(link) ? 'site-header__link--active' : ''"
          >
            {{ link.label }}
            <span v-if="isActive(link)" class="site-header__link-dot" aria-hidden="true" />
          </RouterLink>
        </li>
      </ul>

      <div class="flex items-center gap-2">
        <div class="hidden sm:block">
          <RouterLink to="/get-started" class="btn-primary-pill group !h-9 !px-4 !text-[0.8125rem]">
            Get Started
            <ArrowRight class="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </RouterLink>
        </div>
        <button
          ref="menuTriggerRef"
          type="button"
          class="flex h-10 w-10 touch-manipulation items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-glow-hex)] lg:hidden"
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
    </nav>

    <div
      v-if="menuOpen"
      id="primary-mobile-nav"
      class="anim-slide-down site-header__mobile lg:hidden"
    >
      <nav class="mx-auto max-w-7xl space-y-1 px-4 py-3 sm:px-6">
        <RouterLink
          v-for="link in HEADER_NAV_LINKS"
          :key="link.id"
          :to="navTargetFor(link)"
          class="flex min-h-11 touch-manipulation items-center gap-2 rounded-xl px-3 py-3 text-sm font-medium transition-colors"
          :class="
            isActive(link)
              ? 'bg-[var(--accent-dim)] text-[var(--accent-glow-hex)]'
              : 'text-white/90 hover:bg-white/5 hover:text-[var(--accent-soft-hex)]'
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
