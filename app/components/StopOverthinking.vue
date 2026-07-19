<script setup lang="ts">
defineSlots<{
  title: (props: {}) => any
  description: (props: {}) => any
  default: (props: {}) => any
}>()
</script>

<template>
  <div class="py-16 sm:py-24 bg-linear-to-b from-muted dark:from-muted/40 to-default border-t border-default">
    <UContainer
      as="section"
    >
      <div class="max-w-prose mx-auto">
        <slot
          mdc-unwrap="p"
          name="title"
        />

        <div class="text-muted">
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
