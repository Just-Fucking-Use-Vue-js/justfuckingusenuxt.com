<script setup lang="ts">
defineProps<{
  modules: Array<{
    name: string
    packageName: string
    description: string
    href: string
    icon: string
  }>
}>()

defineSlots<{
  title: (props: {}) => any
  description: (props: {}) => any
}>()
</script>

<template>
  <UPageSection
    id="modules"
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

    <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <li
        v-for="module in modules"
        :key="module.name"
        class="flex"
      >
        <UPageCard
          :to="module.href"
          target="_blank"
          :icon="module.icon"
          :title="module.name"
          :description="module.description"
          variant="subtle"
          class="w-full"
        >
          <template #footer>
            <code class="font-mono text-xs text-muted">{{ module.packageName }}</code>
          </template>
        </UPageCard>
      </li>
    </ul>
  </UPageSection>
</template>
