export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
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
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: '32x32' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  site: { url: 'https://justfuckingusenuxt.com' },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },

  content: {
    experimental: {
      // Node's built-in SQLite, so there is no native module to compile
      sqliteConnector: 'native',
    },
  },

  routeRules: {
    '/': { prerender: true },
  },

  future: {
    compatibilityVersion: 5,
  },

  experimental: {
    buildCache: true,
    extractAsyncDataHandlers: true,
    // @nuxt/content's server routes still rely on Nitro auto-imports
    nitroAutoImports: true,
  },

  compatibilityDate: '2026-10-21',

  nitro: {
    // the whole site is one prerendered page served from static assets
    preset: 'static',
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  fonts: {
    families: [
      { name: 'Inter', weights: [400, 500, 600], global: true },
      { name: 'Outfit', weights: [500], global: true },
    ],
    defaults: {
      subsets: ['latin'],
    },
  },

})
