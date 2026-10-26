<script setup lang="ts">
const props = defineProps<{
  src: string
  alt: string
  width: number
  height: number
}>()

// Equal-area sizing, as on nuxt.com/showcase, so wide wordmarks and compact
// marks carry the same visual weight. Sizes are in rem.
const AREA = 7.5
const MAX_WIDTH = 9
const MAX_HEIGHT = 2.5

const style = computed(() => {
  const ratio = props.width / props.height
  let width = Math.sqrt(AREA * ratio)
  width = Math.min(width, MAX_WIDTH, MAX_HEIGHT * ratio)
  return {
    'width': `${width.toFixed(2)}rem`,
    'aspectRatio': `${props.width} / ${props.height}`,
    '--logo-src': `url(${props.src})`,
  }
})
</script>

<template>
  <span
    role="img"
    :aria-label="alt"
    class="block shrink-0 bg-current [mask:var(--logo-src)_center/contain_no-repeat]"
    :style="style"
  />
</template>
