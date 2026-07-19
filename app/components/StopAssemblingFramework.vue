<script setup lang="ts">
defineSlots<{
  title: (props: {}) => any
  default: (props: {}) => any
}>()
</script>

<template>
  <div class="pt-12 bg-linear-to-b from-muted dark:from-muted/40 to-default border-t border-default">
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
  </div>
</template>
