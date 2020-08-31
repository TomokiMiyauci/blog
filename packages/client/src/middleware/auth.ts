import { user as userStore } from '@/store'
import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
import type firebase from 'firebase'

declare module '@nuxt/types' {
  interface Context {
    $fireStore: firebase.firestore.Firestore
    $fireStoreObj: typeof firebase.firestore
    $fireDb: firebase.database.Database
    $fireDbObj: typeof firebase.database
    $fireFunc: firebase.functions.Functions
    $fireFuncObj: typeof firebase.functions
    $fireStorage: firebase.storage.Storage
    $fireStorageObj: typeof firebase.storage
    $fireAuth: firebase.auth.Auth
    $fireAuthObj: typeof firebase.auth
    $fireAuthUnsubscribe: firebase.Unsubscribe
    $fireMess: firebase.messaging.Messaging
    $fireMessObj: typeof firebase.messaging
    $fireAnalytics: firebase.analytics.Analytics
    $fireAnalyticsObj: typeof firebase.analytics
    $firePerf: firebase.performance.Performance
    $firePerfObj: typeof firebase.performance
    $fireConfig: firebase.remoteConfig.RemoteConfig
    $fireConfigObj: typeof firebase.remoteConfig
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
