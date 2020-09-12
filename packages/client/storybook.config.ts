import { join } from 'path'

export default {
  srcDir: 'src',
  components: true,
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@nuxtjs/composition-api'],
  modules: ['portal-vue/nuxt', 'nuxt-i18n', '@nuxtjs/firebase'],

  i18n: {
    locales: [
      { file: 'ja.json', code: 'ja', iso: 'ja-JP' },
      { file: 'en.json', code: 'en', iso: 'en-US' }
    ],
    vueI18nLoader: true,
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en'
    },
    lazy: true,
    langDir: 'lang/'
  },

  css: ['@/assets/css/transitions.scss', '@/assets/css/main.scss'],

  tailwindcss: {
    configPath: join(__dirname, 'tailwind.config.js')
  },

  firebase: {
    config: {
      apiKey: 'test',
      projectId: 'test'
    },
    onFirebaseHosting: true,
    services: {
      firestore: true,
      auth: true
    }
  }
}
