<script setup lang="ts">
defineSlots<{
  title: (props: {}) => any
  default: (props: {}) => any
}>()
</script>

<template>
  <li class="border-t border-default pt-6 [counter-increment:step] before:font-mono before:text-sm before:text-primary before:content-['0'_counter(step)]">
    <h3 class="mt-3 text-lg text-pretty text-highlighted">
      <slot
        mdc-unwrap="p"
        name="title"
      />
    </h3>
    <p class="mt-2 text-pretty text-muted">
      <slot
        mdc-unwrap="p"
        name="default"
      />
    </p>
  </li>
</template>
