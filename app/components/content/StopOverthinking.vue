<script setup lang="ts">
defineSlots<{
  title: (props: {}) => any
  description: (props: {}) => any
  default: (props: {}) => any
}>()
</script>

<template>
  <UPageSection :ui="{ container: 'pt-0 sm:pt-0 lg:pt-0' }">
    <UPageCTA
      variant="subtle"
      :ui="{ container: 'py-16 sm:py-24', description: 'max-w-2xl mx-auto' }"
    >
      <template #title>
        <slot
          mdc-unwrap="p"
          name="title"
        />
      </template>

      <template #description>
        <slot
          mdc-unwrap="p"
          name="description"
        />
      </template>

      <template #links>
        <UButton
          label="Just fucking use Nuxt"
          size="xl"
          trailing-icon="i-lucide-arrow-right"
          to="https://nuxt.com/docs/4.x/getting-started/installation?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=closing-cta"
          target="_blank"
        />
        <UButton
          label="Star Nuxt on GitHub"
          size="xl"
          color="neutral"
          variant="subtle"
          icon="i-simple-icons-github"
          to="https://github.com/nuxt/nuxt"
          target="_blank"
        />
      </template>
    </UPageCTA>
  </UPageSection>
</template>
