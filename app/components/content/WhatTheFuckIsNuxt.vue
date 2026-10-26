<script setup lang="ts">
defineProps<{
  features: Array<{
    title: string
    description: string
    icon: string
    /** a one-line example; the card spans two columns to show it */
    example?: string
    /** brands shown along the bottom of the card */
    logos?: Array<{ name: string, icon: string }>
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

    <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <li
        v-for="feature in features"
        :key="feature.title"
        class="flex min-w-0"
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
            v-if="feature.example || feature.logos"
            #footer
          >
            <code
              v-if="feature.example"
              class="block w-full break-words rounded-md bg-default px-3 py-2 font-mono text-sm text-primary ring ring-default"
            >{{ feature.example }}</code>
            <ul
              v-if="feature.logos"
              class="flex flex-wrap items-center gap-4"
            >
              <li
                v-for="logo in feature.logos"
                :key="logo.name"
              >
                <UTooltip :text="logo.name">
                  <UIcon
                    :name="logo.icon"
                    class="size-5 text-muted"
                    role="img"
                    :aria-label="logo.name"
                  />
                </UTooltip>
              </li>
            </ul>
          </template>
        </UPageCard>
      </li>
    </ul>
  </UPageSection>
</template>
