import { user as userStore } from '@/store'
import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

export default defineNuxtMiddleware(({ $fire }) => {
  if (userStore.login) return
  $fire.auth.onAuthStateChanged(async (user) => {
    if (user) {
      userStore.setUser(user)
    } else {
      const { user } = await $fire.auth.signInAnonymously()
      if (!user) return
      userStore.setUser(user)
    }
  })
})
