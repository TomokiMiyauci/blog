<template>
  <!-- <div class="container mx-auto"> -->
  <div>
    <readling-progress />

    <div ref="scrollAnchor" />

    <article>
      <div>
        <div style="grid-column: 2 / 3" class="overflow-hidden pb-12">
          <article-header v-bind="article" />

          <section class="row lg:mt-16">
            <toc class="lg:col-2 sm:col-9 px-4 pt-8 mx-auto" :toc="article.toc" />

            <nuxt-content class="lg:col-6 sm:col-9 col-12 px-4 mx-auto" :document="article" />

            <div class="lg:col-2 mx-auto" />

            <!-- <prev-next class="my-32" :prev="prev" :next="next" /> -->
            <div class="container">
              <current-articles class="my-20 px-4" :articles="currentArticles" />
              <article-comment class="mt-32 w-full px-4" />
            </div>
          </section>
        </div>

        <p class="hidden md:block p-4" style="grid-column: 3 / 3">
          <!-- <tags-list class="lg:sticky lg:top-0 lg:pt-24 lg:-mt-24" :tags="['hello', 'world', 'blog']" /> -->
        </p>
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
  import { ref, getCurrentInstance, defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    async asyncData({ $content, app, params }) {
      const article = await $content('articles', app.i18n.locale, params.slug).fetch<Article>()
      const currentArticles = await $content('articles', app.i18n.locale)
        .where({ private: false })
        .limit(4)
        .fetch<Current[]>()

      return { article, currentArticles }
    },

    head() {
      const { title, description, cover } = this.$data.article as Article
      const fullpath = resolve(this.$config.HOSTNAME, this.$route.fullPath)

      return {
        title,
        meta: [
          { hid: 'og:type', property: 'og:type', name: 'og:type', content: 'article' },
          { hid: 'og:title', property: 'og:title', name: 'og:title', content: title },
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
      }
    },

    setup() {
      useRegisterCopyButton()

      const isShow = ref(false)

      //   const { $content, app, params, $config, route } = useContext()

      //   const slug = computed(() => params.value.slug)

      //   // const article = useStatic(
      //   //   async (slug) => {
      //   //     const article = (await $content('articles', app.i18n.locale, slug)
      //   //       .where({ private: false })
      //   //       .fetch<Article>()) as Article
      //   //     const { title: titl, description, cover } = article
      //   //     const fullpath = resolve($config.HOSTNAME, route.value.fullPath)

      //   //     console.log(1111111111, titl)

      //   //     title.value = title.value || titl
      //   //     // meta.value = [
      //   //     //   { hid: 'og:type', property: 'og:type', name: 'og:type', content: 'article' },
      //   //     //   { hid: 'og:title', property: 'og:title', name: 'og:title', content: titl },
      //   //     //   {
      //   //     //     hid: 'og:description',
      //   //     //     property: 'og:description',
      //   //     //     name: 'og:description',
      //   //     //     content: description
      //   //     //   },
      //   //     //   {
      //   //     //     hid: 'description',
      //   //     //     name: 'description',
      //   //     //     content: description
      //   //     //   },
      //   //     //   { hid: 'og:image', name: 'og:image', property: 'og:image', content: cover },
      //   //     //   { hid: 'og:url', name: 'og:url', property: 'og:url', content: fullpath }
      //   //     // ]

      //   //     return article
      //   //   },
      //   //   slug,
      //   //   `${app.i18n.locale}-${slug.value}`
      //   // )

      //   // const currentArticles = useStatic(
      //   //   () => $content('articles', app.i18n.locale).where({ private: false }).limit(4).fetch<Current[]>(),
      //   //   slug,
      //   //   app.i18n.locale
      //   // )

      //   // title.value = article.value?.title

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

      return { formatDate, isShow, scroll, scrollAnchor }
    }
  })
</script>
