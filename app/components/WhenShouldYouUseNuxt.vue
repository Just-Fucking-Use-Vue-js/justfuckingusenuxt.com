<script setup lang="ts">
defineSlots<{
  title: (props: {}) => any
  default: (props: {}) => any
}>()
</script>

<template>
  <UContainer>
    <slot name="title" />

    <slot />
  </UContainer>
</template>
