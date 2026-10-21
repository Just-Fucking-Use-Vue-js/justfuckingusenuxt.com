<script setup lang="ts">
defineSlots<{
  title: (props: {}) => any
  default: (props: {}) => any
  footer: (props: {}) => any
}>()
</script>

<template>
  <UPageSection id="when-to-use-nuxt">
    <template #title>
      <slot
        mdc-unwrap="p"
        name="title"
      />
    </template>

    <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <slot name="default" />
    </ul>

    <p class="mx-auto max-w-2xl text-center text-pretty text-muted sm:text-lg">
      <slot
        mdc-unwrap="p"
        name="footer"
      />
    </p>
  </UPageSection>
</template>
