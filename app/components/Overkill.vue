<script setup lang="ts">
defineSlots<{
  title: (props: {}) => any
  default: (props: {}) => any
  steps: (props: {}) => any
  conclusion: (props: {}) => any
}>()
</script>

<template>
  <UContainer
    as="section"
  >
    <div class="max-w-prose mx-auto">
      <slot
        mdc-unwrap="p"
        name="title"
      />

      <slot name="default" />
    </div>
  </UContainer>
</template>
