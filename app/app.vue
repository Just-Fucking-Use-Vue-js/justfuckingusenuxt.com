<script lang="ts" setup>
const siteUrl = 'https://justfuckingusenuxt.com'
const title = 'Just Fucking Use Nuxt'
const description = 'Stop assembling your Vue framework by hand. Nuxt gives you routing, rendering, server endpoints, data fetching, SEO, and deployment in one coherent codebase.'
const imageAlt = 'Just Fucking Use Nuxt, over a range of green particle mountains.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogUrl: siteUrl,
  ogSiteName: title,
  ogImage: `${siteUrl}/og.png`,
  ogImageAlt: imageAlt,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/png',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `${siteUrl}/og.png`,
  twitterImageAlt: imageAlt,
  twitterCard: 'summary_large_image',
})

useHead({
  link: [
    { rel: 'canonical', href: siteUrl },
  ],
  meta: [
    { name: 'theme-color', content: '#0A0A0A', media: '(prefers-color-scheme: dark)' },
    { name: 'theme-color', content: '#FFFFFF', media: '(prefers-color-scheme: light)' },
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

const { data: page } = await useAsyncData('/', () => queryCollection('content').path('/').first())

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>

<template>
  <UApp v-if="page">
    <a
      href="#main-content"
      class="fixed left-4 top-4 z-100 -translate-y-24 rounded-md bg-default px-4 py-2 font-medium text-highlighted shadow-lg ring-1 ring-default transition-transform focus:translate-y-0 motion-reduce:transition-none"
    >
      Skip to content
    </a>

    <AppHeader />

    <UMain id="main-content">
      <ContentRenderer
        v-if="page.body"
        :value="page"
      />
    </UMain>

    <AppFooter />
  </UApp>
</template>
