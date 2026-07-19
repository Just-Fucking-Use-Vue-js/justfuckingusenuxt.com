<script setup lang="ts">
defineSlots<{
  title: (props: {}) => any
  default: (props: {}) => any
}>()
</script>

<template>
  <UContainer
    as="section"
    class="pb-16 sm:pb-24"
  >
  <div class="max-w-prose mx-auto">
    <slot
      mdc-unwrap="p"
      name="title"
    />

    <slot />
  </div>
  </UContainer>
</template>
