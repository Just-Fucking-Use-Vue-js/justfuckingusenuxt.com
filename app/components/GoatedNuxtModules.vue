<script setup lang="ts">
const props = defineProps<{
  modules: Array<{
    name: string
    packageName: string
    description: string
    href: string
    icon: string
  }>
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

    <div class="grid gap-8 md:grid-cols-2">
      <ProseCard
        v-for="module in props.modules"
        :key="module.name"
        :to="module.href"
        :icon="module.icon"
        :title="module.name"
        target="_blank"
        :ui="{
          base: 'my-0',
          title: 'flex flex-row gap-2 items-end',
          description: 'text-pretty text-base leading-7',
        }"
      >
        <template #title>
          <span>
            {{ module.name }}
          </span>
        </template>

        {{ module.description }}
      </ProseCard>
    </div>
  </UContainer>
</template>
