<script setup lang="ts">
const props = defineProps<{
  groups: Array<{
    title: string
    description: string
  }>
  companies: Array<{
    name: string
    logo: string
    width: number
    height: number
  }>
  href: string
}>()

defineSlots<{
  title: (props: {}) => any
  description: (props: {}) => any
}>()

const half = computed(() => Math.ceil(props.companies.length / 2))
const rows = computed(() => [
  props.companies.slice(0, half.value),
  props.companies.slice(half.value),
])
</script>

<template>
  <UPageSection
    id="showcase"
    :ui="{ description: 'max-w-3xl mx-auto' }"
    :links="[{
      label: 'See the Showcase',
      to: props.href,
      target: '_blank',
      color: 'neutral',
      variant: 'subtle',
      trailingIcon: 'i-lucide-arrow-up-right',
    }]"
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

    <div
      class="flex min-w-0 flex-col gap-10 mask-x-from-85% mask-x-to-100% motion-reduce:hidden"
      aria-hidden="true"
    >
      <UMarquee
        v-for="(row, index) in rows"
        :key="index"
        :reverse="index === 1"
        pause-on-hover
        :ui="{ root: '[--gap:--spacing(14)] sm:[--gap:--spacing(20)] [--duration:45s]' }"
        class="text-highlighted"
      >
        <BrandLogo
          v-for="company in row"
          :key="company.name"
          :src="`/logos/${company.logo}.svg`"
          :alt="company.name"
          :width="company.width"
          :height="company.height"
        />
      </UMarquee>
    </div>

    <!-- read by screen readers; with reduced motion, the logos sit still in a wrapped grid -->
    <ul class="sr-only flex-wrap items-center justify-center gap-x-14 gap-y-10 text-highlighted motion-reduce:not-sr-only motion-reduce:flex">
      <li
        v-for="company in props.companies"
        :key="company.name"
      >
        <BrandLogo
          :src="`/logos/${company.logo}.svg`"
          :alt="company.name"
          :width="company.width"
          :height="company.height"
        />
      </li>
    </ul>

    <ul class="grid gap-8 border-t border-default pt-10 sm:grid-cols-3">
      <li
        v-for="group in props.groups"
        :key="group.title"
      >
        <h3 class="text-base text-highlighted">
          {{ group.title }}
        </h3>
        <p class="mt-1 text-pretty text-muted">
          {{ group.description }}
        </p>
      </li>
    </ul>
  </UPageSection>
</template>
