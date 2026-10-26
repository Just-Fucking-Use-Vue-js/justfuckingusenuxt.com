<script lang="ts" setup>
import { site } from '#shared/site'

const imageUrl = new URL(site.image.path, site.url).href

useSeoMeta({
  title: site.name,
  description: site.description,
  ogTitle: site.name,
  ogDescription: site.description,
  ogType: 'website',
  ogUrl: site.url,
  ogSiteName: site.name,
  ogLocale: site.locale,
  ogImage: imageUrl,
  ogImageAlt: site.image.alt,
  ogImageWidth: site.image.width,
  ogImageHeight: site.image.height,
  ogImageType: site.image.type,
  twitterTitle: site.name,
  twitterDescription: site.description,
  twitterImage: imageUrl,
  twitterImageAlt: site.image.alt,
  twitterCard: 'summary_large_image',
})

useHead({
  link: [
    { rel: 'canonical', href: site.url },
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
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${site.url}#website`,
            'name': site.name,
            'url': site.url,
            'description': site.description,
            'inLanguage': site.language,
          },
          {
            '@type': 'WebPage',
            '@id': `${site.url}#webpage`,
            'url': site.url,
            'name': site.name,
            'description': site.description,
            'inLanguage': site.language,
            'isPartOf': { '@id': `${site.url}#website` },
            'about': { '@type': 'Thing', 'name': 'Nuxt', 'url': 'https://nuxt.com/' },
            'primaryImageOfPage': {
              '@type': 'ImageObject',
              'url': imageUrl,
              'contentUrl': imageUrl,
              'width': site.image.width,
              'height': site.image.height,
              'caption': site.image.alt,
            },
          },
        ],
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
      class="fixed left-4 top-4 z-100 -translate-y-24 rounded-md bg-default px-4 py-2 font-medium text-highlighted shadow-lg ring-1 ring-default focus:translate-y-0"
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
