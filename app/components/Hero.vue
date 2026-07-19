<script lang="ts" setup>
defineSlots<{
  title: (props: {}) => any
  description: (props: {}) => any
}>()
</script>

<template>
  <UPageHero
    :ui="{
      container: 'pb-20! pt-24 sm:pt-32 lg:pt-40',
      title: 'text-5xl sm:text-7xl',
    }"
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
  </UPageHero>
</template>
