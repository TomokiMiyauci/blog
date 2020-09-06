import { join } from 'path'

export default {
  srcDir: 'src',
  components: true,
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@nuxtjs/composition-api'],
  modules: ['nuxt-i18n', '@nuxt/content'],

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

  content: {
    apiPrefix: '',
    dir: ''
  }
}
