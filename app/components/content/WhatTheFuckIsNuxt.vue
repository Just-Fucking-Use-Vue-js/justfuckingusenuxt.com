<script setup lang="ts">
defineProps<{
  features: Array<{
    title: string
    description: string
    icon: string
  }>
}>()

defineSlots<{
  title: (props: {}) => any
  description: (props: {}) => any
}>()
</script>

<template>
  <UPageSection
    id="what-is-nuxt"
    :features="features"
    :ui="{ features: 'lg:grid-cols-4 gap-x-8 gap-y-10', description: 'max-w-3xl mx-auto' }"
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
  </UPageSection>
</template>
