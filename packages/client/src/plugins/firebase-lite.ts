import { Database } from 'firebase-firestore-lite'
import { defineNuxtPlugin } from 'nuxt-composition-api'

declare module 'vue/types/vue' {
  interface Vue {
    $db: Database
  }
}

declare module '@nuxt/types' {
  interface Context {
    $db: Database
  }
}

const plugin = defineNuxtPlugin(({ $config }, inject) => {
  inject('db', new Database({ projectId: $config.PROJECT_ID }))
})

export default plugin
