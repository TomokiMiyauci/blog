import { join } from 'path'

import type { contentFunc } from '@nuxt/content'
import { NuxtConfig } from '@nuxt/types'

const { RelativeCiAgentWebpackPlugin } = require('@relative-ci/agent')
declare module '@nuxt/types/config/hooks' {
  interface NuxtOptionsHooks {
    'content:file:beforeInsert'?: (document: { extension: string; text: string; readingTime: string }) => Promise<void>
  }
}
const HOSTNAME = process.env.HOSTNAME
const PACKAGE_NAME = process.env.npm_package_name
const TWITTER_ACCOUNT = '@techsrc_'
const isProduction = process.env.NODE_ENV === 'production'
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
    title: '',
    titleTemplate: `%s | ${PACKAGE_NAME?.charAt(0).toUpperCase()}${PACKAGE_NAME?.slice(1)}`,
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preconnect',
        href: 'https://www.google-analytics.com/',
        crossorigin: true
      },
      {
        rel: 'preconnect',
        href: 'https://firebaseinstallations.googleapis.com/',
        crossorigin: true
      }
    ],

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
    // Doc: https://github.com/nuxt-community/color-mode-module
    '@nuxtjs/color-mode',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    'nuxt-composition-api'
  ],

  stylelint: {
    lintDirtyModulesOnly: true
  },

  tailwindcss: {
    cssPath: '@/assets/css/tailwind.scss',
    configPath: join(__dirname, 'tailwind.config.js')
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    'nuxt-i18n',
    '@nuxtjs/pwa',
    '@nuxtjs/firebase',
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
    '@nuxtjs/sentry',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap'
  ],

  i18n: {
    locales: [
      { file: 'ja.json', code: 'ja' },
      { file: 'en.json', code: 'en' }
    ],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en'
    },
    lazy: true,
    langDir: 'lang/'
  },

  pwa: {
    meta: {
      ogHost: HOSTNAME?.endsWith('/') ? HOSTNAME.slice(0, -1) : HOSTNAME,
      twitterCard: 'summary',
      twitterSite: TWITTER_ACCOUNT,
      twitterCreator: TWITTER_ACCOUNT,
      nativeUI: true
    }
  },

  firebase: {
    config: {
      apiKey: process.env.API_KEY!,
      authDomain: process.env.AUTH_DOMAIN!,
      databaseURL: process.env.DATABASE_URL!,
      projectId: process.env.PROJECT_ID!,
      storageBucket: process.env.STORAGE_BUCKET!,
      messagingSenderId: process.env.MESSAGING_SENDER_ID!,
      appId: process.env.APP_ID!,
      measurementId: process.env.MEASUREMENT_ID!
    },
    onFirebaseHosting: true,
    services: {
      analytics: {
        collectionEnabled: isProduction
      },
      firestore: true
    }
  },
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
    dsn: process.env.dsn,
    lazy: true
  },

  robots: {
    UserAgent: '*',
    Sitemap: `${HOSTNAME}sitemap.xml`
  },

  sitemap: {
    hostname: HOSTNAME,
    routes: async () => {
      const { $content } = (await import('@nuxt/content')).default as { $content: contentFunc }
      const files = await $content('articles').only(['slug']).fetch<{ slug: string }[]>()
      return files.map(({ slug }) => `/${slug}`)
    },
    gzip: true
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    parallel: true,
    postcss: {
      preset: {
        autoprefixer: {
          grid: 'autoplace'
        }
      }
    },

    extend: (config, { isDev, isServer }) => {
      if (!isDev && !isServer) {
        config.plugins?.push(new RelativeCiAgentWebpackPlugin({ enabled: true }))
      }

      return config
    }
  },

  modern: isProduction ? 'client' : false,

  features: {
    store: false,
    layouts: true,
    meta: true,
    middleware: true,
    transitions: true,
    deprecations: false,
    validate: false,
    asyncData: true,
    fetch: false,
    clientOnline: false,
    clientPrefetch: true,
    clientUseUrl: false,
    componentAliases: false,
    componentClientOnly: false
  },

  generate: {
    interval: 2000
  }
}

export default config
