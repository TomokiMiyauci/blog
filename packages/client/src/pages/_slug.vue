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
        <toc class="hidden md:block" :toc="article.toc" />
        <div style="grid-column: 2 / 3" class="p-2 overflow-hidden pb-12">
          <div class="mb-5 pb-5">
            <article-header v-bind="article" />
          </div>

          <nuxt-content :document="article" />
          <prev-next class="my-32" :prev="prev" :next="next" />
          <article-comment />
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
  import useIntersection from '@/core/intersection'
  import { PrevNext, Article } from '@/types/article'
  import { formatDate } from '@/utils/formatter'
  import { useRegisterCopyButton } from '@/utils/register'
  import { defineComponent, ref, getCurrentInstance } from '@nuxtjs/composition-api'

  export default defineComponent({
    head: {
      meta: [{ hid: 'og:type', property: 'og:type', name: 'og:type', content: 'article' }],
      htmlAttrs: {
        lang: 'ja'
      }
    },

    async asyncData({ params, $content }) {
      const article = await $content('articles', params.slug).fetch<Article>()

      const [prev, next] = await $content('articles')
        .only(['title', 'slug'])
        .sortBy('date', 'desc')
        .surround(params.slug, { before: 1, after: 1 })
        .fetch<[PrevNext, PrevNext]>()

      return { article, prev, next }
    },

    setup(_, { root }) {
      useRegisterCopyButton()

      const isShow = ref(false)

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
