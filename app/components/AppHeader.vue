<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items: NavigationMenuItem[] = [
  { label: 'What Is Nuxt', to: '#what-is-nuxt' },
  { label: 'Conventions', to: '#conventions' },
  { label: 'Modules', to: '#modules' },
  { label: 'Showcase', to: '#showcase' },
  { label: 'When to Use It', to: '#when-to-use-nuxt' },
]
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
