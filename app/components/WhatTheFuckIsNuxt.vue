<script setup lang="ts">
const props = defineProps<{
  features: Array<{
    title: string
    description: string
    icon: string
  }>
}>()

defineSlots<{
  title: (props: {}) => any
  default: (props: {}) => any
}>()
</script>

<template>
  <UContainer
    as="section"
    class="pb-16 sm:pb-24 max-w-screen"
  >
    <div class="max-w-prose mx-auto">
        <slot
          mdc-unwrap="p"
          name="title"
        />

        <slot name="default" />
    </div>

    <UCarousel
      :items="props.features"
      :ui="{
        viewport: '-mx-4 sm:-mx-6 lg:-mx-8',
        item: 'basis-[86%] ps-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4',
      }"
      :auto-scroll="{
        speed: 1.2,
      }"
      loop
      aria-label="Nuxt essentials"
      class="mt-10"
    >
      <template #default="{ item: feature }">
        <ProseCard
          :icon="feature.icon"
          :title="feature.title"
          class="my-px"
          :ui="{
            description: 'text-pretty leading-7 text-base',
          }"
        >
          {{ feature.description }}
        </ProseCard>
      </template>
    </UCarousel>
  </UContainer>
</template>
