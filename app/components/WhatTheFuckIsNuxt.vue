<script setup lang="ts">
const props = defineProps<{
  features: string[]
}>()

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

      <div class="mt-6 space-y-4 text-lg leading-8 text-muted text-pretty">
        <slot name="default" />
      </div>

      <ul
        aria-label="Nuxt essentials"
        class="mt-8 flex flex-wrap gap-2"
      >
        <li
          v-for="feature in props.features"
          :key="feature"
          class="rounded-full bg-elevated px-3 py-1.5 text-sm font-medium text-highlighted"
        >
          {{ feature }}
        </li>
      </ul>
    </div>
  </UContainer>
</template>
