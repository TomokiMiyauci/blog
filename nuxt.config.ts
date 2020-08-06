import { join } from 'path'

import { NuxtConfig } from '@nuxt/types'
declare module '@nuxt/types/config/hooks' {
  interface NuxtOptionsHooks {
    'content:file:beforeInsert'?: (document: { extension: string; text: string; readingTime: string }) => Promise<void>
  }
}
const config: NuxtConfig = {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',

  srcDir: 'src',

  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],

    bodyAttrs: {
      class: ['font-sans font-medium']
    }
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/transitions.scss', '@/assets/css/main.scss'],

  pageTransition: {
    name: 'fade'
  },
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ['@/plugins/vue-scrollactive'],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    'nuxt-composition-api'
  ],

  tailwindcss: {
    configPath: join(__dirname, 'tailwind.config.js')
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
    '@nuxtjs/sentry'
  ],
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css'
      }
    }
  },

  hooks: {
    'content:file:beforeInsert': async (document) => {
      if (document.extension === '.md') {
        const { default: readingTime } = await import('reading-time')
        const { text } = readingTime(document.text)
        document.readingTime = text
      }
    }
  },

  sentry: {
    dsn: process.env.dsn
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    postcss: {
      preset: {
        autoprefixer: {
          grid: 'autoplace'
        }
      }
    }
  },

  modern: 'client',

  features: {
    store: false,
    layouts: true,
    meta: true,
    middleware: false,
    transitions: true,
    deprecations: false,
    validate: false,
    asyncData: true,
    fetch: false,
    clientOnline: false,
    clientPrefetch: true,
    clientUseUrl: true,
    componentAliases: false,
    componentClientOnly: false
  },

  generate: {
    interval: 2000
  }
}

export default config
