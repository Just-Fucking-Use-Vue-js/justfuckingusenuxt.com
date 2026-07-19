<script setup lang="ts">
const props = defineProps<{
  groups: Array<{
    title: string
    description: string
  }>
  companies: string[]
  href: string
}>()

defineSlots<{
  title: (props: {}) => any
  default: (props: {}) => any
}>()
</script>

<template>
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

    <div class="grid gap-6 lg:grid-cols-3">
      <ProseCard
        v-for="group in props.groups"
        :key="group.title"
        :title="group.title"
        :description="group.description"
        :ui="{
          base: 'my-0',
          description: 'text-pretty text-base leading-7',
        }"
      >
        {{ group.description }}
      </ProseCard>
    </div>

    <ul
      class="mt-5 flex flex-row justify-evenly gap-2"
    >
      <li
        v-for="company in props.companies"
        :key="company"
        class="rounded-full bg-elevated px-3 py-1.5 text-sm font-medium text-highlighted ring-1 ring-default"
      >
        {{ company }}
      </li>
    </ul>
  </UContainer>
</template>
