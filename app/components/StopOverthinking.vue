<script setup lang="ts">
defineSlots<{
  title: (props: {}) => any
  description: (props: {}) => any
  default: (props: {}) => any
}>()
</script>

<template>
  <div class="bg-linear-to-b from-muted dark:from-muted/40 to-default">
    <UContainer class="py-14 sm:py-20" as="section">
      <div class="max-w-4xl">
        <div class="text-3xl font-bold tracking-tight sm:text-4xl">
          <slot
            mdc-unwrap="p"
            name="title"
          />
        </div>

        <div class="mt-6 max-w-3xl leading-8 text-muted text-pretty sm:text-lg">
          <slot
            mdc-unwrap="p"
            name="description"
          />
        </div>

        <div class="mt-12 text-xl font-bold tracking-tight sm:text-2xl">
          <slot
            mdc-unwrap="p"
            name="default"
          />
        </div>

        <UButton
          class="mt-12"
          color="primary"
          label="Get started"
          size="xl"
          to="https://nuxt.com/docs/4.x/getting-started/installation?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=closing-cta"
          trailing-icon="i-lucide-arrow-right"
        />
      </div>
    </UContainer>
  </div>
</template>
