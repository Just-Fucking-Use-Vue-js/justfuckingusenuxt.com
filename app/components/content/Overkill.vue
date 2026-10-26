<script setup lang="ts">
defineSlots<{
  title: (props: {}) => any
  description: (props: {}) => any
  lead: (props: {}) => any
  default: (props: {}) => any
  footer: (props: {}) => any
}>()
</script>

<template>
  <UPageSection :ui="{ description: 'max-w-3xl mx-auto' }">
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

    <p class="mb-12 text-center font-heading text-xl text-pretty text-highlighted sm:text-2xl">
      <slot
        mdc-unwrap="p"
        name="lead"
      />
    </p>

    <ol class="grid gap-x-8 gap-y-10 [counter-reset:step] sm:grid-cols-2 lg:grid-cols-4">
      <slot name="default" />
    </ol>

    <p class="mx-auto max-w-2xl text-center text-pretty text-muted sm:text-lg">
      <slot
        mdc-unwrap="p"
        name="footer"
      />
    </p>
  </UPageSection>
</template>
