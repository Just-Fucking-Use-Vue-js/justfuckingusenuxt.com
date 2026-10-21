<script setup lang="ts">
defineProps<{
  conventions: Array<{
    from: string
    to: string
    example: string
  }>
}>()

defineSlots<{
  title: (props: {}) => any
  description: (props: {}) => any
  default: (props: {}) => any
}>()
</script>

<template>
  <UPageSection
    id="conventions"
    :ui="{ description: 'max-w-3xl mx-auto' }"
  >
    <template #title>
      <slot
        mdc-unwrap="p"
        name="title"
      />
    </template>

    <template #description>
      <slot
        mdc-unwrap="p"
        name="description"
      />
    </template>

    <div class="mx-auto w-full min-w-0 max-w-4xl">
      <div
        class="hidden grid-cols-3 gap-6 pb-3 text-sm text-muted sm:grid"
        aria-hidden="true"
      >
        <span>Starting from Vue</span>
        <span>With Nuxt conventions</span>
        <span>Example</span>
      </div>

      <ul class="divide-y divide-default border-y border-default">
        <li
          v-for="convention in conventions"
          :key="convention.to"
          class="grid gap-1 py-4 sm:grid-cols-3 sm:items-center sm:gap-6"
        >
          <span class="text-muted">
            <span class="sr-only">Starting from Vue: </span>{{ convention.from }}
          </span>
          <span class="font-medium text-highlighted">
            <span class="sr-only">With Nuxt: </span>{{ convention.to }}
          </span>
          <code class="mt-1 font-mono text-sm break-words text-primary sm:mt-0">{{ convention.example }}</code>
        </li>
      </ul>

      <div class="mt-16 text-base/7 sm:text-lg/8 [&_.shiki]:text-sm">
        <slot name="default" />
      </div>
    </div>
  </UPageSection>
</template>
