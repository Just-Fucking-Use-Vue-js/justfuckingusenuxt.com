import { addComponent, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'register-lib-components',
  },
  setup() {
    addComponent({
      name: 'gcard',
      filePath: '@nuxt/ui/components/Card.vue',
      global: true,
      priority: 1,
    })
  },
})
