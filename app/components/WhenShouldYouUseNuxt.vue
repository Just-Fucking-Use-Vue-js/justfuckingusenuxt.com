<script setup lang="ts">
defineSlots<{
  title: (props: {}) => any
  default: (props: {}) => any
}>()
</script>

<template>
  <UContainer class="py-14 sm:py-20 text-lg">
    <slot name="title" />

    <slot />
  </UContainer>
</template>
