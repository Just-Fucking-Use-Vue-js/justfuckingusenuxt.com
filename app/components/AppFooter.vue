<script setup lang="ts">
import type { FooterColumn } from '@nuxt/ui'

const columns: FooterColumn[] = [
  {
    label: 'Ecosystem',
    children: [
      {
        label: 'Just Fucking Use Vue.js',
        to: 'https://justfuckingusevuejs.com?utm_source=justfuckingusenuxt.com&utm_medium=footer&utm_campaign=justfuckingusenuxt&utm_term=Just+Fucking+Use+Vue.js&utm_content=link',
        target: '_blank',
      },
      {
        label: 'Just Fucking Use Nuxt',
        to: 'https://justfuckingusenuxt.com?utm_source=justfuckingusenuxt.com&utm_medium=footer&utm_campaign=justfuckingusenuxt&utm_term=Just+Fucking+Use+Nuxt&utm_content=link',
        target: '_blank',
      },
      {
        label: 'Just Fucking Use Nuxt UI',
        to: 'https://justfuckingusenuxtui.com?utm_source=justfuckingusenuxt.com&utm_medium=footer&utm_campaign=justfuckingusenuxt&utm_term=Just+Fucking+Use+Nuxt+UI&utm_content=link',
        target: '_blank',
      },
    ],
  },
  {
    label: 'Inspiration',
    children: [
      {
        label: 'Just Fucking Use Tailwind',
        to: 'https://justfuckingusetailwind.com?utm_source=justfuckingusenuxt.com&utm_medium=footer&utm_campaign=justfuckingusenuxt&utm_term=Just+Fucking+Use+Tailwind&utm_content=link',
        target: '_blank',
      },
      {
        label: 'Motherfucking Website',
        to: 'https://motherfuckingwebsite.com?utm_source=justfuckingusenuxt.com&utm_medium=footer&utm_campaign=justfuckingusenuxt&utm_term=Motherfucking+Website&utm_content=link',
        target: '_blank',
      },
      {
        label: 'Just Fucking Use HTML',
        to: 'https://justfuckingusehtml.com?utm_source=justfuckingusenuxt.com&utm_medium=footer&utm_campaign=justfuckingusenuxt&utm_term=Just+Fucking+Use+HTML&utm_content=link',
        target: '_blank',
      },
      {
        label: 'Just Fucking Use React',
        to: 'https://justfuckingusereact.com?utm_source=justfuckingusenuxt.com&utm_medium=footer&utm_campaign=justfuckingusenuxt&utm_term=Just+Fucking+Use+React&utm_content=link',
        target: '_blank',
      },
    ],
  },
  {
    label: 'Resources',
    children: [
      {
        label: 'Vue.js',
        to: 'https://vuejs.org?utm_source=justfuckingusenuxt.com&utm_medium=footer&utm_campaign=justfuckingusenuxt&utm_term=Vue.js&utm_content=link',
        target: '_blank',
      },
      {
        label: 'Nuxt',
        to: 'https://nuxt.com?utm_source=justfuckingusenuxt.com&utm_medium=footer&utm_campaign=justfuckingusenuxt&utm_term=Nuxt&utm_content=link',
        target: '_blank',
      },
      {
        label: 'Nuxt UI',
        to: 'https://ui.nuxt.com?utm_source=justfuckingusenuxt.com&utm_medium=footer&utm_campaign=justfuckingusenuxt&utm_term=Nuxt+UI&utm_content=link',
        target: '_blank',
      },
    ],
  },
]
</script>

<template>
  <USeparator
    icon="i-simple-icons-nuxtdotjs"
    class="h-px"
  />

  <UFooter>
    <template #top>
      <UContainer>
        <UFooterColumns :columns="columns" />
      </UContainer>
    </template>

    <template #left>
      <p class="text-muted text-sm">
        Built by <ULink
          to="https://soubiran.dev?utm_source=justfuckingusenuxt.com&utm_medium=footer&utm_campaign=justfuckingusenuxt&utm_term=Estéban&utm_content=link"
          target="_blank"
        >
          Estéban
        </ULink> and the community.
      </p>
    </template>

    <template #right>
      <UButton
        icon="i-lucide-heart"
        color="neutral"
        variant="ghost"
        to="https://github.com/sponsors/barbapapazes?utm_source=justfuckingusenuxt.com&utm_medium=footer&utm_campaign=justfuckingusenuxt&utm_term=Support+Estéban&utm_content=link"
        target="_blank"
      >
        <span class="sr-only"> Support Estéban </span>
      </UButton>
      <UButton
        icon="i-simple-icons-x"
        color="neutral"
        variant="ghost"
        to="https://x.com/soubiran_"
        target="_blank"
      >
        <span class="sr-only"> Estéban on X </span>
      </UButton>
      <UButton
        icon="i-simple-icons-linkedin"
        color="neutral"
        variant="ghost"
        to="https://linkedin.com/in/esteban25"
        target="_blank"
      >
        <span class="sr-only"> Estéban on LinkedIn </span>
      </UButton>
      <UButton
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        to="https://github.com/Just-Fucking-Use-Vue-js/justfuckingusenuxt.com"
        target="_blank"
      >
        <span class="sr-only"> Just Fucking Use Nuxt on GitHub </span>
      </UButton>
    </template>
  </UFooter>
</template>
