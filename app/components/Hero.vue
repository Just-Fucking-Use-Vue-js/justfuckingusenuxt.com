<script lang="ts" setup>
defineSlots<{
  title: (props: {}) => any
  description: (props: {}) => any
}>()
</script>

<template>
  <UPageHero
    :ui="{
      container: '!pb-20 py-24 sm:py-32 lg:py-40',
      title: 'text-5xl sm:text-7xl',
      wrapper: 'lg:min-h-[540px]',
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
