<script lang="ts" setup>
import type { MountainsRenderer } from '~/lib/mountains/renderer'

defineSlots<{
  title: (props: {}) => any
  description: (props: {}) => any
}>()

const command = 'npm create nuxt@latest'

const root = useTemplateRef<{ $el: HTMLElement }>('root')
const canvas = useTemplateRef('canvas')
const logo = useTemplateRef('logo')
const painted = ref(false)
const colorMode = useColorMode()
const toast = useToast()

let renderer: MountainsRenderer | undefined

// The scene starts once the page is idle, so it never competes with the copy
// for the first paint. Without WebGL2, or on a software renderer, the static
// glow stays on its own. `?shader=0` turns it off and `?shader=force` keeps it
// on a software renderer, for screenshots on machines without a GPU.
onNuxtReady(async () => {
  const mode = new URLSearchParams(window.location.search).get('shader')
  const slot = root.value?.$el.querySelector<HTMLElement>('[data-slot="wrapper"]')
  if (!canvas.value || !slot || !window.WebGL2RenderingContext || mode === '0') return

  const { createMountains } = await import('~/lib/mountains/renderer')
  try {
    renderer = createMountains({
      canvas: canvas.value,
      slot,
      trigger: logo.value,
      light: colorMode.value === 'light',
      force: mode === 'force',
    })
  }
  catch {
    return
  }
  renderer.onFirstFrame = () => {
    painted.value = true
  }
})

watch(() => colorMode.value, value => renderer?.setLight(value === 'light'))

onBeforeUnmount(() => renderer?.dispose())

async function copyCommand() {
  await navigator.clipboard.writeText(command)
  toast.add({ title: 'Command copied', icon: 'i-lucide-clipboard-check', color: 'success' })
}
</script>

<template>
  <UPageHero
    ref="root"
    :ui="{
      root: 'overflow-hidden',
      container: 'pt-24 pb-40 sm:pt-32 sm:pb-56 lg:pt-40 lg:pb-64',
      headline: 'mb-8',
      title: 'text-5xl sm:text-7xl text-balance',
      description: 'max-w-2xl mx-auto',
    }"
  >
    <template #top>
      <AppHeroBackground
        class="absolute inset-x-0 -top-px -z-10 w-full text-primary"
        aria-hidden="true"
      />
      <canvas
        ref="canvas"
        aria-hidden="true"
        class="absolute inset-0 -z-10 size-full opacity-0 transition-opacity duration-1000 ease-out mask-b-from-70% mask-b-to-100% motion-reduce:transition-none"
        :class="{ 'opacity-100': painted }"
      />
    </template>

    <template #headline>
      <button
        ref="logo"
        type="button"
        aria-label="Send a wave through the mountains"
        class="rounded-lg p-1 transition-transform duration-150 ease-out active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none"
      >
        <AppLogo class="size-14" />
      </button>
    </template>

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

    <template #links>
      <UButton
        label="Get Started"
        size="xl"
        trailing-icon="i-lucide-arrow-right"
        to="https://nuxt.com/docs/4.x/getting-started/installation?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=hero"
        target="_blank"
      />
      <UButton
        :label="command"
        size="xl"
        color="neutral"
        variant="subtle"
        icon="i-lucide-terminal"
        trailing-icon="i-lucide-copy"
        class="font-mono"
        :ui="{ trailingIcon: 'text-dimmed' }"
        aria-label="Copy npm create nuxt@latest"
        @click="copyCommand"
      />
    </template>
  </UPageHero>
</template>
