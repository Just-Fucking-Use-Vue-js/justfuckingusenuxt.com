<script setup lang="ts">
defineProps<{
  questions: string[]
}>()

defineSlots<{
  title: (props: {}) => any
  description: (props: {}) => any
}>()
</script>

<template>
  <UPageSection orientation="horizontal">
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

    <ul class="divide-y divide-default border-y border-default">
      <li
        v-for="question in questions"
        :key="question"
        class="py-4 font-heading text-lg text-pretty text-highlighted sm:text-xl"
      >
        {{ question }}
      </li>
    </ul>
  </UPageSection>
</template>
