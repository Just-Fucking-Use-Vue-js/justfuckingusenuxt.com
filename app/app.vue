<script lang="ts" setup>
import { site } from '#shared/site'

useSeoMeta({
  // The homepage title is the site name; skip the "%s | %siteName" template.
  title: site.name,
  titleTemplate: '%s',
  description: site.description,
  ogLocale: site.locale,
  ogImage: {
    url: site.image.path,
    alt: site.image.alt,
    width: site.image.width,
    height: site.image.height,
    type: site.image.type,
  },
  twitterCard: 'summary_large_image',
})

useHead({
  meta: [
    { name: 'theme-color', content: '#0A0A0A', media: '(prefers-color-scheme: dark)' },
    { name: 'theme-color', content: '#FFFFFF', media: '(prefers-color-scheme: light)' },
  ],
})

useSchemaOrg([
  defineWebPage({
    about: { '@type': 'Thing', 'name': 'Nuxt', 'url': 'https://nuxt.com/' },
    primaryImageOfPage: {
      url: site.image.path,
      width: site.image.width,
      height: site.image.height,
      caption: site.image.alt,
    },
  }),
])

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
