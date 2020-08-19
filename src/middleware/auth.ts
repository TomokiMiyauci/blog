import { user as userStore } from '@/store'
import { defineNuxtMiddleware } from 'nuxt-composition-api'

declare module '@nuxt/types' {
  interface Context {
    $fireAuth: firebase.auth.Auth
  }
}

export default defineNuxtMiddleware(({ $fireAuth }) => {
  if (userStore.login) return
  $fireAuth.onAuthStateChanged(async (user) => {
    if (user) {
      userStore.setId(user.uid)
    } else {
      const { user } = await $fireAuth.signInAnonymously()
      if (!user) return
      userStore.setId(user.uid)
    }
  })
})
