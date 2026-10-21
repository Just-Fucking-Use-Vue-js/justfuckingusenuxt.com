<script lang="ts" setup>
defineSlots<{
  title: (props: {}) => any
  default: (props: {}) => any
  link: (props: {}) => any
}>()
</script>

<template>
  <li class="flex">
    <UPageCard
      variant="subtle"
      class="w-full"
    >
      <template #title>
        <h3 class="text-lg text-pretty text-highlighted">
          <slot
            mdc-unwrap="p"
            name="title"
          />
        </h3>
      </template>

      <template #description>
        <p class="text-pretty text-muted">
          <slot
            mdc-unwrap="p"
            name="default"
          />
        </p>
      </template>

      <template #footer>
        <span class="text-sm font-medium [&_a]:text-primary">
          <slot
            mdc-unwrap="p"
            name="link"
          />
        </span>
      </template>
    </UPageCard>
  </li>
</template>
