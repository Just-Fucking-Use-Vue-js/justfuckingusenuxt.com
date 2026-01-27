export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
  ],

  $production: {
    app: {
      head: {
        script: [
          {
            'src': 'https://umami.soubiran.dev/script.js',
            'defer': true,
            'data-website-id': '81e883b6-abed-4e6f-8661-135f41d16cfa',
          },
        ],
      },
    },
  },

  devtools: {
    enabled: false,
  },
  app: {
    head: {
      title: 'Just Fucking Use Nuxt',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true },
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
