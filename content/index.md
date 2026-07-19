::hero
#title
Just Fucking Use <span class="text-primary">Nuxt</span>.
#description
Stop assembling your router, server, rendering strategy, and deployment pipeline by hand.<br />Build the Vue app you actually came here to build.
::

::your-vue-project
#title
## Your Vue project is becoming a pile of decisions.

#default
- Which router?
- Which state setup?
- SSR, SSG, SPA, or edge?
- API server or separate backend?
- SEO, data fetching, image handling, deployment?
- Which five plugins will quietly become infrastructure?

Nuxt handles the boring decisions so you can **focus on building**.
::

::what-the-fuck-is-nuxt
---
features:
  - title: Zero configuration
    description: Start with Vue or TypeScript. Nuxt wires up the fundamentals so you can start building instead of configuring.
    icon: i-lucide-wand-sparkles
  - title: Rendering modes
    description: Render on the server, client, or at build time. Pick the right approach for each route, not the whole app.
    icon: i-lucide-monitor-cog
  - title: Routing and layouts
    description: Create a file for a page, then compose layouts around it. The router is ready when your next screen is.
    icon: i-lucide-route
  - title: Data fetching
    description: Fetch data with composables that work across rendering modes, caching, and navigation without extra ceremony.
    icon: i-lucide-database-zap
  - title: Error handling
    description: Catch failures with framework-aware handlers and build useful error pages without starting from scratch.
    icon: i-lucide-circle-alert
  - title: Transitions
    description: Add smooth page and layout transitions when they improve the experience, not as a separate integration project.
    icon: i-lucide-panels-top-left
  - title: Assets and style
    description: Optimize images, fonts, and scripts with first-class support that keeps production performance in view.
    icon: i-lucide-image
  - title: SEO and metadata
    description: Ship crawlable HTML and manage typed metadata in the same place you build your pages.
    icon: i-lucide-search-check
  - title: Modular by design
    description: Add capabilities through Nuxt modules that follow the same conventions as the framework itself.
    icon: i-lucide-puzzle
  - title: Middleware
    description: Protect routes and run shared logic before rendering, with clear rules that stay close to your app.
    icon: i-lucide-shield-check
  - title: Type-safe by default
    description: Use generated types and TypeScript support throughout the project, from routes to runtime configuration.
    icon: i-lucide-braces
---
#title
## What the fuck is Nuxt?

#default
Nuxt is Vue with the boring, necessary parts already connected: routing, rendering, server endpoints, data fetching, SEO, TypeScript support, and deployment.

You still write Vue. You just **stop rebuilding the framework** around it.
::

::stop-assembling-framework
#title
## Stop assembling a framework.

#default
Vue gives you an excellent view layer. A production application needs more than a view layer, so the same integration checklist appears in project after project.

Nuxt turns that checklist into **conventions you can understand at a glance**.

| Starting from Vue                         | **With Nuxt conventions**    | Example                                     |
|-------------------------------------------|------------------------------|---------------------------------------------|
| Install and configure a router            | Create a page                | `app/pages/about.vue`                       |
| Choose a pattern for server data          | Use an SSR-aware composable  | `useFetch('/api/products')`                 |
| Create and connect a separate API project | Add a server handler         | `server/api/orders.post.ts`                 |
| Stitch together SEO tooling               | Define typed metadata        | `useSeoMeta({ title })`                     |
| Commit to one rendering strategy          | Choose what each route needs | `routeRules: { '/blog/**': { swr: 3600 } }` |
| Rework the output for each host           | Build portable Nitro output  | `nuxt build`                                |

Create a page. You have a route. No router ceremony, no extra wiring.

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
    description: 'The complete SEO toolkit for Nuxt: metadata, sitemaps, structured data, and more. Help search engines find and understand your app without assembling a dozen packages.'
    href: 'https://nuxt.com/modules/seo?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=goated-modules'
    icon: 'i-lucide-search-check'
  - name: 'Nuxt Tailwind CSS'
    packageName: '@nuxtjs/tailwindcss'
    description: 'Bring Tailwind into Nuxt with sensible defaults, config discovery, and minimal production CSS. Utility-first styling, minus the integration busywork.'
    href: 'https://nuxt.com/modules/tailwindcss?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=goated-modules'
    icon: 'i-lucide-palette'
  - name: 'VueUse'
    packageName: '@vueuse/nuxt'
    description: 'A collection of battle-tested Vue composables with Nuxt-friendly auto-imports. Reach for browser APIs, reactive utilities, and common UI behavior without writing each helper from scratch.'
    href: 'https://nuxt.com/modules/vueuse?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=goated-modules'
    icon: 'i-lucide-wrench'
  - name: 'Nuxt MCP Toolkit'
    packageName: '@nuxtjs/mcp-toolkit'
    description: 'Create type-safe MCP tools, resources, prompts, and interactive apps directly in your Nuxt project. Your app can finally talk to AI clients without a second server.'
    href: 'https://mcp-toolkit.nuxt.dev/?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=goated-modules'
    icon: 'i-lucide-bot'
  - name: 'NuxtHub'
    packageName: '@nuxthub/core'
    description: 'Add a database, KV, blob storage, and caching to your Nuxt app. Build full-stack features without collecting cloud services like Pokémon cards.'
    href: 'https://nuxt.com/modules/hub?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=goated-modules'
    icon: 'i-lucide-database'
  - name: 'Pinia'
    packageName: '@pinia/nuxt'
    description: 'The Vue store that is actually pleasant to use, with Nuxt-aware setup and auto-imported stores. Reach for it when state deserves a real home.'
    href: 'https://nuxt.com/modules/pinia?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=goated-modules'
    icon: 'i-lucide-layers-3'
  - name: 'evlog'
    packageName: 'evlog/nuxt'
    description: 'Emit one structured, context-rich event per request instead of a panic-inducing trail of console logs. Debug production with evidence, not vibes.'
    href: 'https://nuxt.com/modules/evlog?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=goated-modules'
    icon: 'i-lucide-file-search'
---
#title
## Nuxt Modules are fucking goated.

#default
Nuxt covers the foundation. Modules add the good stuff without making every integration a side quest. They plug into the framework, and it just works.
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
  - Louis Vuitton
  - Armani
  - The North Face
  - GitLab
  - Directus
  - n8n
  - NASA JPL
  - Croix-Rouge française
  - Explore France
---
#title
## Nuxt is already in production.

#default
Nuxt is not a clever experiment waiting for a real-world test. It is already doing the work for global brands, technology companies, and public organizations around the world.
::

::overkill
#title
## “But isn’t Nuxt overkill?”

#default
For a tiny static page with no application behavior, use HTML. Seriously. Nuxt is a framework, not a personality test.

But when you need routes, shared UI, real data, forms, SEO, authentication, server logic, or a growing team, the foundation starts demanding its own backlog.

Nuxt is not a pile of features you must use on day one. It is Vue with a path forward.

::gcard
---
variant: subtle
---

1. **Start with a single page.** Run it as a client-rendered app if that is all it needs to be.
2. **Add a route when there is another screen.** Create a file in `app/pages/`, and Nuxt supplies the router.
3. **Add server code when the app needs it.** Put a handler in `server/api/`, beside the frontend that calls it.
4. **Add rendering where it earns its keep.** Pre-render a landing page, server-render content that needs SEO, and keep dashboards on the client.

::

You scale the application, not the setup. Same project. Same Vue components. More capability **only when it solves a real problem**.
::

::when-should-you-use-nuxt
#title
## When should you use Nuxt?

#default
  ::why-nuxt
  #title
  Need a static website? Use Nuxt.

  #default
  Nuxt pre-renders your routes into HTML at build time, ready for any static host. Fast pages, low infrastructure overhead, no awkward workarounds.

  #link
  [Learn about prerendering](https://nuxt.com/docs/4.x/getting-started/prerendering?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=when-to-use-nuxt)
  ::

  ::why-nuxt
  #title
  Need a dynamic website? Use Nuxt.

  #default
  Start with server-rendered HTML, then choose caching, prerendering, or client-side rendering where each route needs it. Your website can grow up without changing frameworks.

  #link
  [Explore Nuxt rendering modes](https://nuxt.com/docs/4.x/guide/concepts/rendering?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=when-to-use-nuxt)
  ::

  ::why-nuxt
  #title
  Need backend logic? Use Nuxt.

  #default
  Put handlers in `server/api/` and Nitro handles routes, responses, middleware, and deployment targets. Keep the server beside the frontend that calls it, and split them only when the architecture actually demands it.

  #link
  [Meet the Nuxt server](https://nuxt.com/docs/4.x/getting-started/server?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=when-to-use-nuxt)
  ::

  ::why-nuxt
  #title
  Need search engines to see your content? Use Nuxt.

  #default
  Nuxt can deliver fully rendered HTML to crawlers, while `useSeoMeta` gives you type-safe control of every important meta tag. Search engines get content, not a loading spinner.

  #link
  [Improve your SEO and meta](https://nuxt.com/docs/4.x/getting-started/seo-meta?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=when-to-use-nuxt)
  ::

  ::why-nuxt
  #title
  Need deployment flexibility? Use Nuxt.

  #default
  Nitro targets Node, static hosts, serverless platforms, and the edge. Nuxt adapts its output to your provider instead of making you adapt your entire app.

  #link
  [See Nuxt deployment options](https://nuxt.com/docs/4.x/getting-started/deployment?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=when-to-use-nuxt)
  ::

  ::why-nuxt
  #title
  Want less boilerplate between you and the work? Use Nuxt.

  #default
  File-based routing, component and composable auto-imports, SSR-friendly state, and sensible defaults keep the boilerplate out of your way. You get to build the thing.

  #link
  [Discover Nuxt auto-imports](https://nuxt.com/docs/4.x/guide/concepts/auto-imports?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=when-to-use-nuxt)
  ::

  If you are building a Vue application rather than a one-off document, stop treating the same plumbing as a rite of passage. **Just use Nuxt**.
::

::stop-overthinking
#title
## Stop configuring. Start shipping.

#description
Nuxt isn't perfect. Nothing is. But it gives you routing, rendering, server endpoints, data fetching, SEO, and deployment in one coherent codebase. Stop stitching together the foundation before you can ship the product.

#default
Just fucking use Nuxt.
::
