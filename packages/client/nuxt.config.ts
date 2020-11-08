import { join } from 'path'

import type { Article } from '@/types/article'
import { $content } from '@nuxt/content'
import type { NuxtConfig } from '@nuxt/types'

const PROJECT_NAME = 'IntelliSense'
const HOSTNAME = process.env.HOSTNAME
const TWITTER_ACCOUNT = '@techsrc_'
const isProduction = process.env.NODE_ENV === 'production'
const config: NuxtConfig = {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */

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
    titleTemplate: `%s | ${PROJECT_NAME}`,
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

  router: {
    middleware: 'auth'
  },

  publicRuntimeConfig: {
    PROJECT_NAME,
    HOSTNAME
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
    '@nuxtjs/composition-api'
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
    'portal-vue/nuxt',
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
      { file: 'ja.json', code: 'ja', iso: 'ja-JP' },
      { file: 'en.json', code: 'en', iso: 'en-US' }
    ],
    defaultLocale: 'en',
    vueI18nLoader: true,
    vueI18n: {
      fallbackLocale: 'en'
    },
    lazy: true,
    langDir: 'lang/',
    seo: false,
    vuex: false
  },

  pwa: {
    meta: {
      name: PROJECT_NAME,
      ogHost: HOSTNAME?.endsWith('/') ? HOSTNAME.slice(0, -1) : HOSTNAME,
      twitterCard: 'summary',
      twitterSite: TWITTER_ACCOUNT,
      twitterCreator: TWITTER_ACCOUNT,
      nativeUI: true
    },

    manifest: {
      name: PROJECT_NAME,
      short_name: PROJECT_NAME
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
      firestore: true,
      auth: true
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
    Sitemap: `${HOSTNAME}sitemap.xml.gz`
  },

  sitemap: {
    hostname: HOSTNAME,
    i18n: true,
    trailingSlash: true,
    defaults: {
      changefreq: 'daily',
      priority: 0.5,
      lastmod: new Date()
    },
    routes: async () => {
      // const { $content } = (await import('@nuxt/content')).default as { $content: $content }
      const only = ['slug', 'tags', 'updatedAt']
      const jaFiles = (await $content('articles', 'ja')
        .only(only)
        .where({ private: false })
        .fetch<Article[]>()) as Article[]
      const enFiles = (await $content('articles', 'en')
        .only(only)
        .where({ private: false })
        .fetch<Article[]>()) as Article[]

      const { toKebabCase } = await import(join(__dirname, 'src', 'utils', 'formatter'))

      const jaTags = jaFiles.map(({ tags }) => tags).flat()
      const enTags = enFiles.map(({ tags }) => tags).flat()

      const jaTagLocs = Array.from(new Set(jaTags)).map((tag) => {
        return {
          url: `ja/tags/${toKebabCase(tag)}`,
          links: ['en', 'ja'].map((lang) => {
            const baseUrl = lang === 'en' ? 'tags/' : `${lang}/tags/`
            return { lang, url: `${baseUrl}${tag}/` }
          })
        }
      })
      const enTagLocs = Array.from(new Set(enTags)).map((tag) => {
        return {
          url: `/tags/${toKebabCase(tag)}`,
          links: ['en', 'ja'].map((lang) => {
            const baseUrl = lang === 'en' ? 'tags/' : `${lang}/tags/`
            return { lang, url: `${baseUrl}${tag}/` }
          })
        }
      })
      const jaLocs = jaFiles.map(({ slug, updatedAt }) => ({
        url: `/ja/post/${slug}`,
        priority: 1,
        lastmod: updatedAt,
        links: ['en', 'ja'].map((lang) => {
          const baseUrl = lang === 'en' ? 'post/' : `${lang}/post/`
          return { lang, url: `${baseUrl}${slug}/` }
        })
      }))
      const enLocs = enFiles.map(({ slug, updatedAt }) => {
        return {
          url: `/post/${slug}`,
          lastmod: updatedAt,
          priority: 1,
          links: ['en', 'ja'].map((lang) => {
            const baseUrl = lang === 'en' ? 'post/' : `${lang}/post/`
            return { lang, url: `${baseUrl}${slug}/` }
          })
        }
      })

      return [...jaLocs, ...enLocs, ...jaTagLocs, ...enTagLocs]
    },
    gzip: true
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    parallel: !isProduction,
    cache: !isProduction,
    // extractCSS: isProduction,
    postcss: {
      preset: {
        autoprefixer: {
          grid: 'autoplace'
        }
      }
    },

    extend: (config, { isDev, isServer }) => {
      if (!isDev && !isServer && process.env.ANALYZE) {
        const { RelativeCiAgentWebpackPlugin } = require('@relative-ci/agent')
        config.plugins?.push(new RelativeCiAgentWebpackPlugin({ enabled: true }))
      }

      return config
    }
  },

  modern: isProduction ? 'client' : false,

  features: {
    store: true,
    layouts: true,
    meta: true,
    middleware: true,
    transitions: true,
    deprecations: false,
    validate: true,
    asyncData: true,
    fetch: false,
    clientOnline: false,
    clientPrefetch: true,
    clientUseUrl: false,
    componentAliases: false,
    componentClientOnly: true
  },

  generate: {
    interval: 1500
  }
}

export default config
