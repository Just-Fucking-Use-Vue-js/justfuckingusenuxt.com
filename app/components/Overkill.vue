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
    class="py-14 sm:py-20"
  >
      <div class="text-3xl font-bold tracking-tight sm:text-4xl">
        <slot
          mdc-unwrap="p"
          name="title"
        />
      </div>

      <slot
        mdc-unwrap="p"
        name="default"
      />
  </UContainer>
</template>
