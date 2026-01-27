<script lang="ts" setup>
const { data: page } = await useAsyncData('/', () => queryCollection('content').path('/').first())

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>

<template>
  <div v-if="page">
    <UPageBody>
      <ContentRenderer
        v-if="page.body"
        :value="page"
      />
    </UPageBody>
  </div>
</template>
