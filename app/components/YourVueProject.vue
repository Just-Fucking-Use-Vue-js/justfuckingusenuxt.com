<script setup lang="ts">
defineSlots<{
  title: (props: {}) => any
  default: (props: {}) => any
}>()
</script>

<template>
  <UContainer
    as="section"
    class="py-14 sm:py-20"
  >
    <div class="max-w-3xl">
      <div class="text-3xl font-bold tracking-tight sm:text-4xl">
        <slot
          mdc-unwrap="p"
          name="title"
        />
      </div>

      <div class="text-lg">
        <slot name="default" />
      </div>
    </div>
  </UContainer>
</template>
