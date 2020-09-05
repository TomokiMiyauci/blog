import { join } from 'path'

export default {
  srcDir: 'src',
  components: true,
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/tailwindcss', '@nuxtjs/composition-api'],
  modules: ['nuxt-i18n'],

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

  tailwindcss: {
    configPath: join(__dirname, 'tailwind.config.js')
  }
}
