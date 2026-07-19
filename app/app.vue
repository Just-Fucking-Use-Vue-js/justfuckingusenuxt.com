<script lang="ts" setup>
const siteUrl = 'https://justfuckingusenuxt.com'
const title = 'Just Fucking Use Nuxt'
const description = 'Stop assembling your Vue framework by hand. Nuxt gives you routing, rendering, server endpoints, data fetching, SEO, and deployment in one coherent codebase.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogUrl: siteUrl,
  ogSiteName: title,
  ogImage: `${siteUrl}/og/index.svg`,
  ogImageAlt: 'Just Fucking Use Nuxt. Stop assembling a framework. Start shipping your Vue app.',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `${siteUrl}/og/index.svg`,
  twitterImageAlt: 'Just Fucking Use Nuxt. Stop assembling a framework. Start shipping your Vue app.',
  twitterCard: 'summary_large_image',
})

useHead({
  link: [
    { rel: 'canonical', href: siteUrl },
  ],
  meta: [
    { name: 'theme-color', content: '#020617', media: '(prefers-color-scheme: dark)' },
    { name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': title,
        'url': siteUrl,
        'description': description,
      }),
    },
  ],
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

const { data: page } = await useAsyncData('/', () => queryCollection('content').path('/').first())

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>

<template>
  <UApp v-if="page">
    <a
      href="#main-content"
      class="fixed left-4 top-4 z-50 -translate-y-24 rounded-md bg-default px-4 py-2 font-medium text-highlighted shadow-lg ring-1 ring-default transition-transform focus:translate-y-0 motion-reduce:transition-none"
    >
      Skip to content
    </a>

    <UMain id="main-content">
      <AppHeroBackground
        class="absolute w-full -top-px transition-all text-primary shrink-0 -z-10 motion-reduce:transition-none"
        :class="[
          isLoading ? '' : (appear ? '' : 'opacity-0'),
          appeared ? '' : 'duration-1000',
        ]"
      />

      <UPageBody class="py-0 my-0 text-lg">
        <ContentRenderer
          v-if="page.body"
          :value="page"
        />
      </UPageBody>
    </UMain>

    <AppFooter />
  </UApp>
</template>
