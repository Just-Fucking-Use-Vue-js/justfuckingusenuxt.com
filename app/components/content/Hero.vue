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

let renderer: MountainsRenderer | undefined

// The scene starts once the page is idle, so it never competes with the copy
// for the first paint. Without WebGL2, or on a software renderer, the static
// glow stays on its own.
onNuxtReady(async () => {
  const slot = root.value?.$el.querySelector<HTMLElement>('[data-slot="wrapper"]')
  if (!canvas.value || !slot || !window.WebGL2RenderingContext) return

  const { createMountains } = await import('~/lib/mountains/renderer')
  try {
    renderer = createMountains({
      canvas: canvas.value,
      slot,
      trigger: logo.value,
      light: colorMode.value === 'light',
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

onBeforeUnmount(() => {
  renderer?.dispose()
  clearTimeout(copiedTimer)
})

// the button itself confirms the copy, next to the pointer, for 1.5s
const copied = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | undefined

async function copyCommand() {
  await navigator.clipboard.writeText(command)
  copied.value = true
  clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => {
    copied.value = false
  }, 1500)
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
        class="font-mono"
        aria-label="Copy npm create nuxt@latest"
        @click="copyCommand"
      >
        <template #trailing="{ ui }">
          <Transition
            mode="out-in"
            enter-active-class="transition-[opacity,scale] duration-150 ease-out motion-reduce:transition-opacity"
            leave-active-class="transition-[opacity,scale] duration-150 ease-out motion-reduce:transition-opacity"
            enter-from-class="opacity-0 scale-80 motion-reduce:scale-100"
            leave-to-class="opacity-0 scale-80 motion-reduce:scale-100"
          >
            <UIcon
              :key="copied ? 'check' : 'copy'"
              :name="copied ? 'i-lucide-check' : 'i-lucide-copy'"
              :class="ui.trailingIcon({ class: copied ? 'text-primary' : 'text-dimmed' })"
            />
          </Transition>
        </template>
      </UButton>
      <span
        class="sr-only"
        aria-live="polite"
      >{{ copied ? 'Command copied' : '' }}</span>
    </template>
  </UPageHero>
</template>
