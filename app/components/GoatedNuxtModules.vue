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
    class="py-14 sm:py-20"
  >
    <div class="max-w-3xl">
      <div class="text-3xl font-bold tracking-tight sm:text-4xl">
        <slot
          mdc-unwrap="p"
          name="title"
        />
      </div>

      <div class="mt-6 text-lg leading-8 text-muted text-pretty">
        <slot name="default" />
      </div>
    </div>

    <div class="mt-10 grid gap-8 md:grid-cols-2">
      <UCard
        v-for="module in props.modules"
        :key="module.name"
        variant="subtle"
        class="relative"
      >
         <div class="flex items-center gap-3">
            <div class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <UIcon
                :name="module.icon"
                class="size-5"
              />
            </div>

            <div>
              <h3 class="font-semibold text-highlighted">
                {{ module.name }}
              </h3>
              <p class="mt-0.5 font-mono text-xs text-dimmed">
                {{ module.packageName }}
              </p>
            </div>
          </div>

        <p class="mt-3 leading-7 text-muted text-pretty">
          {{ module.description }}
        </p>

        <a
          :href="module.href"
          target="_blank"
          rel="noreferrer"
          color="primary"
          class="absolute inset-0"
        >
        <span class="sr-only">
          See the module
        </span>
        </a>
      </UCard>
    </div>
  </UContainer>
</template>
