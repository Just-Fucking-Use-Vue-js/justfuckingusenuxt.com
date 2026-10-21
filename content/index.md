::hero
#title
Just Fucking Use <span class="text-primary">Nuxt</span>.

#description
Stop assembling your router, server, rendering strategy, and deployment pipeline by hand. Build the Vue app you actually came here to build.
::

::your-vue-project
---
questions:
  - Which router?
  - Which state setup?
  - SSR, SSG, SPA, or edge?
  - API server or separate backend?
  - SEO, data fetching, image handling, deployment?
  - Which five plugins will quietly become infrastructure?
---
#title
Your Vue project is becoming a pile of decisions.

#description
Every one of them is reasonable. Together they are a framework you now maintain. Nuxt makes the boring decisions so you can **focus on building**.
::

::what-the-fuck-is-nuxt
---
features:
  - title: Zero configuration
    description: Start writing Vue. Nuxt wires up the rest.
    icon: i-lucide-wand-sparkles
    example: "export default defineNuxtConfig({})"
  - title: Error handling
    description: Framework-aware handlers and real error pages.
    icon: i-lucide-circle-alert
  - title: Transitions
    description: Page and layout transitions, built in.
    icon: i-lucide-panels-top-left
  - title: Assets and style
    description: Images, fonts, and scripts, optimized.
    icon: i-lucide-image
  - title: Routing and layouts
    description: Create a file, get a route. Wrap it in a layout.
    icon: i-lucide-route
    example: app/pages/blog/[slug].vue → /blog/:slug
  - title: SEO and metadata
    description: Crawlable HTML and typed meta tags.
    icon: i-lucide-search-check
  - title: Rendering modes
    description: Server, client, or build time, chosen per route.
    icon: i-lucide-monitor-cog
    example: "'/blog/**': { swr: 3600 }"
  - title: Modular by design
    description: Modules that follow the framework’s conventions.
    icon: i-lucide-puzzle
  - title: Middleware
    description: Shared logic that runs before a route renders.
    icon: i-lucide-shield-check
  - title: Type-safe by default
    description: Generated types, from routes to runtime config.
    icon: i-lucide-braces
  - title: Deploy anywhere
    description: Node, static, serverless, or edge from one build.
    icon: i-lucide-rocket
  - title: Data fetching
    description: SSR-aware composables with caching built in.
    icon: i-lucide-database-zap
    example: "const { data } = await useFetch('/api/posts')"
---
#title
What the fuck is Nuxt?

#description
Nuxt is Vue with the boring, necessary parts already connected. You still write Vue. You just **stop rebuilding the framework** around it.
::

::stop-assembling-framework
---
conventions:
  - from: Install and configure a router
    to: Create a page
    example: app/pages/about.vue
  - from: Choose a pattern for server data
    to: Use an SSR-aware composable
    example: useFetch('/api/products')
  - from: Create and connect a separate API project
    to: Add a server handler
    example: server/api/orders.post.ts
  - from: Stitch together SEO tooling
    to: Define typed metadata
    example: 'useSeoMeta({ title })'
  - from: Commit to one rendering strategy
    to: Choose what each route needs
    example: "routeRules: { '/blog/**': { swr: 3600 } }"
  - from: Rework the output for each host
    to: Build portable Nitro output
    example: nuxt build
---
#title
Stop assembling a framework.

#description
Vue gives you an excellent view layer. A production app needs more than that, so the same integration checklist shows up in project after project. Nuxt turns that checklist into **conventions you can understand at a glance**.

#default
Create a page and you have a route. No router ceremony, no extra wiring.

```vue [app/pages/products.vue]
<script setup lang="ts">
const { data: products } = await useFetch('/api/products')
</script>

<template>
  <ProductGrid :products="products ?? []" />
</template>
```

Need an endpoint? Put it beside the app that calls it.

```ts [server/api/orders.post.ts]
export default defineEventHandler(async (event) => {
  const order = await readBody(event)
  return { accepted: true, order }
})
```

Need a route to behave differently? Say so, once.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  routeRules: {
    '/blog/**': { swr: 3600 },
    '/admin/**': { ssr: false },
  },
})
```

Nuxt does not make your application simple. It stops the setup from becoming an application of its own.
::

::goated-nuxt-modules
---
modules:
  - name: 'Nuxt UI'
    packageName: '@nuxt/ui'
    description: 'A polished, accessible component library built on Tailwind CSS. Make the interface feel finished without rebuilding a design system before lunch.'
    href: 'https://nuxt.com/modules/ui?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=goated-modules'
    icon: 'i-lucide-panels-top-left'
  - name: 'Nuxt SEO'
    packageName: '@nuxtjs/seo'
    description: 'Metadata, sitemaps, structured data, and more in one toolkit. Help search engines find and understand your app without assembling a dozen packages.'
    href: 'https://nuxt.com/modules/seo?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=goated-modules'
    icon: 'i-lucide-search-check'
  - name: 'Nuxt Tailwind CSS'
    packageName: '@nuxtjs/tailwindcss'
    description: 'Tailwind in Nuxt with sensible defaults, config discovery, and minimal production CSS. Utility-first styling, minus the integration busywork.'
    href: 'https://nuxt.com/modules/tailwindcss?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=goated-modules'
    icon: 'i-lucide-palette'
  - name: 'VueUse'
    packageName: '@vueuse/nuxt'
    description: 'Battle-tested Vue composables, auto-imported. Reach for browser APIs, reactive utilities, and common UI behavior without writing each helper yourself.'
    href: 'https://nuxt.com/modules/vueuse?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=goated-modules'
    icon: 'i-lucide-wrench'
  - name: 'Nuxt MCP Toolkit'
    packageName: '@nuxtjs/mcp-toolkit'
    description: 'Type-safe MCP tools, resources, prompts, and interactive apps, right in your Nuxt project. Your app can finally talk to AI clients without a second server.'
    href: 'https://mcp-toolkit.nuxt.dev/?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=goated-modules'
    icon: 'i-lucide-bot'
  - name: 'NuxtHub'
    packageName: '@nuxthub/core'
    description: 'A database, KV, blob storage, and caching for your Nuxt app. Build full-stack features without collecting cloud services like Pokémon cards.'
    href: 'https://nuxt.com/modules/hub?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=goated-modules'
    icon: 'i-lucide-database'
  - name: 'Pinia'
    packageName: '@pinia/nuxt'
    description: 'The Vue store that is actually pleasant to use, with Nuxt-aware setup and auto-imported stores. Reach for it when state deserves a real home.'
    href: 'https://nuxt.com/modules/pinia?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=goated-modules'
    icon: 'i-lucide-layers-3'
  - name: 'evlog'
    packageName: 'evlog/nuxt'
    description: 'One structured, context-rich event per request instead of a panic-inducing trail of console logs. Debug production with evidence, not vibes.'
    href: 'https://nuxt.com/modules/evlog?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=goated-modules'
    icon: 'i-lucide-file-search'
---
#title
Nuxt modules are fucking goated.

#description
Nuxt covers the foundation. Modules add the good stuff without turning every integration into a side quest. They plug into the framework, and it just works.
::

::production-proof
---
href: 'https://nuxt.com/showcase?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=production-proof'
groups:
  - title: 'Global brands'
    description: 'Public websites serving international audiences at serious scale.'
  - title: 'Technology companies'
    description: 'Production websites from developer tools and software businesses.'
  - title: 'Public organizations'
    description: 'Public-interest organizations where reliability and reach are not optional.'
companies:
  - { name: 'Louis Vuitton', logo: 'louis-vuitton', width: 232, height: 24 }
  - { name: 'GitLab', logo: 'git-lab', width: 394, height: 120 }
  - { name: 'NASA Jet Propulsion Laboratory', logo: 'nasa-jet-propulsion-laboratory', width: 324, height: 72 }
  - { name: 'Armani', logo: 'armani', width: 101, height: 24 }
  - { name: 'Directus', logo: 'directus', width: 124, height: 26 }
  - { name: 'Croix-Rouge française', logo: 'croix-rouge', width: 321.8, height: 95.9 }
  - { name: 'The North Face', logo: 'the-north-face', width: 70, height: 32 }
  - { name: 'n8n', logo: 'n8n', width: 87, height: 24 }
  - { name: 'Explore France', logo: 'explore-france', width: 123, height: 28 }
  - { name: 'Nintendo', logo: 'nintendo', width: 128, height: 32 }
  - { name: 'Stack Overflow', logo: 'stack-overflow', width: 175, height: 22 }
  - { name: 'La Poste', logo: 'la-poste', width: 162, height: 24 }
  - { name: 'Prada', logo: 'prada', width: 128, height: 20 }
  - { name: 'Microsoft Edge Developer', logo: 'microsoft-edge-developer', width: 120, height: 26 }
  - { name: 'Roland Garros', logo: 'roland-garros', width: 62, height: 62 }
  - { name: 'Timberland', logo: 'timberland', width: 2318.7, height: 406.9 }
  - { name: 'Upwork', logo: 'upwork', width: 102, height: 28 }
  - { name: 'Virgin Galactic', logo: 'virgin-galactic', width: 114, height: 28 }
  - { name: 'Harrods', logo: 'harrods', width: 160, height: 75 }
  - { name: 'Adyen', logo: 'adyen', width: 80, height: 26 }
  - { name: 'Vans', logo: 'vans', width: 25, height: 9 }
  - { name: 'Shopware', logo: 'shopware', width: 320, height: 69 }
  - { name: 'McDonald’s France', logo: 'mc-donalds-france', width: 44, height: 44 }
  - { name: 'TikTok Ads', logo: 'tiktok-ads', width: 129, height: 32 }
---
#title
Nuxt is already in production.

#description
Nuxt is not a clever experiment waiting for a real-world test. It already does the work for global brands, technology companies, and public organizations around the world.
::

::overkill
#title
“But isn’t Nuxt overkill?”

#description
For a tiny static page with no application behavior, use HTML. Seriously. Nuxt is a framework, not a personality test. But once you need routes, shared UI, real data, forms, SEO, authentication, server logic, or a growing team, the foundation starts demanding its own backlog.

#lead
Nuxt is not a pile of features you must use on day one. It is Vue with a path forward.

#default
  ::overkill-step
  #title
  Start with a single page.

  #default
  Run it as a client-rendered app if that is all it needs to be.
  ::

  ::overkill-step
  #title
  Add a route when there is another screen.

  #default
  Create a file in `app/pages/`, and Nuxt supplies the router.
  ::

  ::overkill-step
  #title
  Add server code when the app needs it.

  #default
  Put a handler in `server/api/`, beside the frontend that calls it.
  ::

  ::overkill-step
  #title
  Add rendering where it earns its keep.

  #default
  Prerender a landing page, server-render content that needs SEO, and keep dashboards on the client.
  ::

#footer
You scale the application, not the setup. Same project. Same Vue components. More capability **only when it solves a real problem**.
::

::when-should-you-use-nuxt
#title
When should you use Nuxt?

#default
  ::why-nuxt
  #title
  Need a static website? Use Nuxt.

  #default
  Prerender every route to HTML for any static host.

  #link
  [Learn about prerendering](https://nuxt.com/docs/4.x/getting-started/prerendering?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=when-to-use-nuxt)
  ::

  ::why-nuxt
  #title
  Need a dynamic website? Use Nuxt.

  #default
  Server-render, cache, or prerender each route as it needs.

  #link
  [Explore rendering modes](https://nuxt.com/docs/4.x/guide/concepts/rendering?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=when-to-use-nuxt)
  ::

  ::why-nuxt
  #title
  Need backend logic? Use Nuxt.

  #default
  Put handlers in `server/api/`, next to the frontend that calls them.

  #link
  [Meet the Nuxt server](https://nuxt.com/docs/4.x/getting-started/server?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=when-to-use-nuxt)
  ::

  ::why-nuxt
  #title
  Need search engines to see your content? Use Nuxt.

  #default
  Crawlers get rendered HTML, not a loading spinner.

  #link
  [Improve your SEO](https://nuxt.com/docs/4.x/getting-started/seo-meta?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=when-to-use-nuxt)
  ::

  ::why-nuxt
  #title
  Need deployment flexibility? Use Nuxt.

  #default
  One build for Node, static hosts, serverless, or the edge.

  #link
  [See deployment options](https://nuxt.com/docs/4.x/getting-started/deployment?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=when-to-use-nuxt)
  ::

  ::why-nuxt
  #title
  Want less boilerplate between you and the work? Use Nuxt.

  #default
  File routing, auto-imports, and sensible defaults. You build the thing.

  #link
  [Discover auto-imports](https://nuxt.com/docs/4.x/guide/concepts/auto-imports?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=when-to-use-nuxt)
  ::

#footer
If you are building a Vue application rather than a one-off document, stop treating the same plumbing as a rite of passage. **Just use Nuxt.**
::

::stop-overthinking
#title
Stop configuring. Start shipping.

#description
Nuxt isn’t perfect. Nothing is. But it gives you routing, rendering, server endpoints, data fetching, SEO, and deployment in one coherent codebase. Stop stitching the foundation together before you can ship the product.

#default
Just fucking use Nuxt.
::
