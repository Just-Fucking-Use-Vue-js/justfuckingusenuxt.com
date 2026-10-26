<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

// Only these links scroll smoothly. Focus moves from Tab and the skip link
// jump, since keyboard actions shouldn't wait on an animation.
function scrollToSection(event: Event, id: string) {
  const section = document.getElementById(id)
  if (!section) return
  // Reka passes its own select event; the link's click is inside it
  const click = (event as CustomEvent<{ originalEvent?: Event }>).detail?.originalEvent ?? event
  click.preventDefault()
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  section.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  history.pushState(null, '', `#${id}`)
}

const sections = [
  { label: 'What Is Nuxt', id: 'what-is-nuxt' },
  { label: 'Conventions', id: 'conventions' },
  { label: 'Modules', id: 'modules' },
  { label: 'Showcase', id: 'showcase' },
  { label: 'When to Use It', id: 'when-to-use-nuxt' },
]

const items: NavigationMenuItem[] = sections.map(({ label, id }) => ({
  label,
  to: `#${id}`,
  onSelect: (event: Event) => scrollToSection(event, id),
}))
</script>

<template>
  <UHeader :ui="{ title: 'items-center text-base font-medium font-heading' }">
    <template #title>
      <AppLogo class="size-7" />
      <span>Just Fucking Use Nuxt</span>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
      <UColorModeButton />
      <UButton
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        to="https://github.com/Just-Fucking-Use-Vue-js/justfuckingusenuxt.com"
        target="_blank"
        aria-label="Just Fucking Use Nuxt on GitHub"
      />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </UHeader>
</template>
