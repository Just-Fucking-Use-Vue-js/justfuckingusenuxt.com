::hero
#title
Just Fucking Use <span class="text-primary">Nuxt</span>.
#description
Stop wasting time configuring your project, your router, and your store.<br />Stop writing code nobody understands. Just fucking use Nuxt.
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

Nuxt brings boring decisions so you can **focus on building**.
::

::what-the-fuck-is-nuxt
---
features:
  - Routing
  - Rendering
  - Server endpoints
  - Data fetching
  - SEO
  - TypeScript
  - Deployment
---
#title
## What the fuck is Nuxt?

#default
Nuxt is Vue with the boring, necessary parts already connected: routing, rendering, server endpoints, data fetching, SEO, TypeScript support, and deployment.

You still write Vue. You just stop rebuilding the framework around it.
::

::overkill
#title
## “But isn’t Nuxt overkill?”

#default
Only if you need an app that will never grow. Nuxt is not a pile of features you must use on day one. It is Vue with a path forward.

::gcard
---
class: my-6
variant: subtle
---

1. **Start with a single page.** Run it as a client-rendered app if that is all it needs to be.
2. **Add a route when there is another screen.** Create a file in `app/pages/`, and Nuxt supplies the router.
3. **Add server code when the app needs it.** Put a handler in `server/api/`, beside the frontend that calls it.
4. **Add rendering where it earns its keep.** Pre-render a landing page, server-render content that needs SEO, and keep dashboards on the client.

::

You scale the application, not the framework. Same project. Same Vue components. More capability **only when it solves a real problem**.
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
  Start with server-rendered HTML, then choose caching, prerendering, client-side rendering, or all three per route. Your website can grow up without changing frameworks.

  #link
  [Explore Nuxt rendering modes](https://nuxt.com/docs/4.x/guide/concepts/rendering?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=when-to-use-nuxt)
  ::

  ::why-nuxt
  #title
  Need a server? Use Nuxt.

  #default
  Nuxt ships with Nitro: a production-ready server runtime for server rendering, middleware, route rules, and deployment. One project, not a pile of services.

  #link
  [Meet the Nuxt server](https://nuxt.com/docs/4.x/getting-started/server?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=when-to-use-nuxt)
  ::

  ::why-nuxt
  #title
  Building an API? Use Nuxt.

  #default
  Put handlers in `server/api/` and Nitro handles routes, JSON responses, middleware, and deployment targets. Your frontend and API can finally share a home.

  #link
  [Learn about server endpoints](https://nuxt.com/docs/4.x/getting-started/server#server-endpoints--middleware?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=when-to-use-nuxt)
  ::

  ::why-nuxt
  #title
  Want the best SEO? Use Nuxt.

  #default
  Nuxt can deliver fully rendered HTML to crawlers, while `useSeoMeta` gives you type-safe control of every important meta tag. Search engines get content, not a loading spinner.

  #link
  [Improve your SEO and meta](https://nuxt.com/docs/4.x/getting-started/seo-meta?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=when-to-use-nuxt)
  ::

  ::why-nuxt
  #title
  Never know where your code executes? Use Nuxt.

  #default
  Nuxt supports universal rendering and gives you explicit `import.meta.server` and `import.meta.client` guards when code needs a specific environment. No more guessing games.

  #link
  [Understand rendering in Nuxt](https://nuxt.com/docs/4.x/guide/concepts/rendering?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=when-to-use-nuxt)
  ::

  ::why-nuxt
  #title
  Tired of fighting your hosting provider? Use Nuxt.

  #default
  Nitro targets Node, static hosts, serverless platforms, and the edge. Nuxt adapts its output to your provider instead of making you adapt your entire app.

  #link
  [See Nuxt deployment options](https://nuxt.com/docs/4.x/getting-started/deployment?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=when-to-use-nuxt)
  ::

  ::why-nuxt
  #title
  Want to use the bundler you want? Use Nuxt.

  #default
  Vite is the default, but Nuxt also supports webpack and Rspack. Choose the builder in `nuxt.config.ts` and keep your framework, instead of rebuilding your app around a bundler.

  #link
  [Choose your Nuxt builder](https://nuxt.com/docs/4.x/api/nuxt-config#builder?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=when-to-use-nuxt)
  ::

  ::why-nuxt
  #title
  Want a delightful developer experience? Use Nuxt.

  #default
  File-based routing, component and composable auto-imports, SSR-friendly state, and sensible defaults keep the boilerplate out of your way. You get to build the thing.

  #link
  [Discover Nuxt auto-imports](https://nuxt.com/docs/4.x/guide/concepts/auto-imports?utm_source=justfuckingusenuxt.com&utm_medium=referral&utm_campaign=when-to-use-nuxt)
  ::

  Honestly, you should just stop asking yourself if you should use Nuxt. **Just use Nuxt all the time**.
::

::stop-overthinking
#title
## Stop configuring. Start shipping.

#description
Nuxt isn't perfect. Nothing is. But it gives you file-based routing, server rendering, API endpoints, SEO, and deployment in one codebase. Stop stitching together a router, server, build tool, and a pile of plugins before you can ship a page.

#default
Just fucking use Nuxt.
::
