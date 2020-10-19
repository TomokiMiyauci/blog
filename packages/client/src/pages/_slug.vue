<template>
  <div class="container mx-auto">
    <readling-progress />
    <nuxt-link
      ref="scrollAnchor"
      class="inline-flex items-center dark:hover:text-nuxt-lightgreen light:hover:text-nuxt-lightgreen dark:text-dark-onSurfaceSecondary light:text-light-onSurfaceSecondary nuxt-link-active"
      :to="localePath('/')"
    ></nuxt-link>

    <article>
      <div class="flex md:grid grid-temp grid-cols-main">
        <toc v-if="article" class="hidden md:block" :toc="article.toc" />
        <div style="grid-column: 2 / 3" class="p-2 overflow-hidden pb-12">
          <div class="mb-5 pb-5">
            <article-header v-bind="article" />
          </div>

          <nuxt-content :document="article" />
          <!-- <prev-next class="my-32" :prev="prev" :next="next" /> -->
          <current-articles class="my-20" :articles="currentArticles" />
          <article-comment class="mt-20" />
        </div>

        <div class="hidden md:block p-4" style="grid-column: 3 / 3">
          <tags-list class="lg:sticky lg:top-0 lg:pt-24 lg:-mt-24" :tags="['hello', 'world', 'blog']" />
        </div>
      </div>
    </article>
    <portal to="bottom-right">
      <transition name="zoom-in">
        <button-circle
          v-show="isShow"
          class="bg-teal-800 animate-bounce text-white hover:bg-gray-900 hover:shadow-2xl shadow"
          @click="scroll"
        >
          <mdi-transfer-up />
        </button-circle>
      </transition>
    </portal>
  </div>
</template>

<script lang="ts">
  // eslint-disable-next-line node/no-deprecated-api
  import { resolve } from 'url'

  import useIntersection from '@/core/intersection'
  import { Article, Current } from '@/types/article'
  import { formatDate } from '@/utils/formatter'
  import { useRegisterCopyButton } from '@/utils/register'
  import {
    ref,
    getCurrentInstance,
    useContext,
    useStatic,
    computed,
    defineComponent,
    useMeta
  } from '@nuxtjs/composition-api'

  export default defineComponent({
    head: {},

    setup() {
      useRegisterCopyButton()

      const isShow = ref(false)

      const { $content, app, params, $config, route } = useContext()
      const { title, meta } = useMeta()

      const slug = computed(() => params.value.slug)

      const article = useStatic(
        async (slug) => {
          const article = (await $content('articles', app.i18n.locale, slug)
            .where({ private: false })
            .fetch<Article>()) as Article
          const { title: titl, description, cover } = article
          const fullpath = resolve($config.HOSTNAME, route.value.fullPath)

          title.value = titl
          meta.value = [
            { hid: 'og:type', property: 'og:type', name: 'og:type', content: 'article' },
            { hid: 'og:title', property: 'og:title', name: 'og:title', content: titl },
            {
              hid: 'og:description',
              property: 'og:description',
              name: 'og:description',
              content: description
            },
            {
              hid: 'description',
              name: 'description',
              content: description
            },
            { hid: 'og:image', name: 'og:image', property: 'og:image', content: cover },
            { hid: 'og:url', name: 'og:url', property: 'og:url', content: fullpath }
          ]

          return article
        },
        slug,
        `${app.i18n.locale}/${slug.value}`
      )

      const currentArticles = useStatic(
        () => $content('articles', app.i18n.locale).where({ private: false }).limit(4).fetch<Current[]>(),
        slug,
        app.i18n.locale
      )

      getCurrentInstance()!.$on('intersect', () => {
        isShow.value = true
      })

      getCurrentInstance()!.$on('outersect', () => {
        isShow.value = false
      })

      const scrollAnchor = ref()
      useIntersection(scrollAnchor)

      const scroll = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }

      return { formatDate, isShow, scroll, scrollAnchor, article, currentArticles }
    }
  })
</script>
