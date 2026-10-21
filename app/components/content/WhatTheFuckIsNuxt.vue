<script setup lang="ts">
defineProps<{
  features: Array<{
    title: string
    description: string
    icon: string
    /** a one-line example; the card spans two columns to show it */
    example?: string
  }>
}>()

defineSlots<{
  title: (props: {}) => any
  description: (props: {}) => any
}>()
</script>

<template>
  <UPageSection
    id="what-is-nuxt"
    :ui="{ description: 'max-w-2xl mx-auto' }"
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

    <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <li
        v-for="feature in features"
        :key="feature.title"
        class="flex"
        :class="{ 'sm:col-span-2': feature.example }"
      >
        <UPageCard
          :icon="feature.icon"
          :title="feature.title"
          :description="feature.description"
          variant="subtle"
          class="w-full"
          :ui="{ title: 'text-base', description: 'text-sm text-muted', footer: 'w-full' }"
        >
          <template
            v-if="feature.example"
            #footer
          >
            <code class="block w-full truncate rounded-md bg-default px-3 py-2 font-mono text-sm text-primary ring ring-default">{{ feature.example }}</code>
          </template>
        </UPageCard>
      </li>
    </ul>
  </UPageSection>
</template>
