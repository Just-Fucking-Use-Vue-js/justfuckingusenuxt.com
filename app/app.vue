<script lang="ts" setup>
useSeoMeta({
  title: 'Just Fucking Use Nuxt',
  ogTitle: 'Just Fucking Use Nuxt',
  description: 'Stop overthinking your UI. Stop wasting time configuring your project. Stop writing code nobody understands. Just fucking use Nuxt.',
  ogDescription: 'Stop overthinking your UI. Stop wasting time configuring your project. Stop writing code nobody understands. Just fucking use Nuxt.',
  twitterDescription: 'Stop overthinking your UI. Stop wasting time configuring your project. Stop writing code nobody understands. Just fucking use Nuxt.',
  ogImage: 'https://justfuckingusenuxt.com/og/index.png',
  twitterImage: 'https://justfuckingusenuxt.com/og/index.png',
  twitterCard: 'summary_large_image',
})

const { isLoading } = useLoadingIndicator()

const appear = ref(false)
const appeared = ref(false)
onMounted(() => {
  setTimeout(() => {
    appear.value = true
    setTimeout(() => {
      appeared.value = true
    }, 1000)
  }, 0)
})
</script>

<template>
  <UApp>
    <UMain>
      <HeroBackground
        class="absolute w-full -top-px transition-all text-primary shrink-0 -z-10"
        :class="[
          isLoading ? '' : (appear ? '' : 'opacity-0'),
          appeared ? '' : 'duration-1000',
        ]"
      />
    </UMain>

    <AppFooter />
  </UApp>
</template>
