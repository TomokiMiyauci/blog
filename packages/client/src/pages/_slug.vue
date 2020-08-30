<template>
  <div>
    <nuxt-link
      class="anchor inline-flex items-center dark:hover:text-nuxt-lightgreen light:hover:text-nuxt-lightgreen dark:text-dark-onSurfaceSecondary light:text-light-onSurfaceSecondary nuxt-link-active"
      :to="localePath('/')"
      >← Back to Home</nuxt-link
    >

    <article class="mt-12">
      <div class="flex md:grid grid-temp grid-cols-main">
        <toc class="hidden md:block" :toc="article.toc" />
        <div style="grid-column: 2 / 3" class="p-2 overflow-hidden">
          <div class="mb-10 pb-10">
            <base-h-1 :text="article.title" />
            <tags :tags="article.tags" />
            <p class="mt-1 flex justify-between">
              {{ formatDate(article.updatedAt, $i18n.locale)
              }}<span class="inline-flex items-center">
                <button-like />
                <view-counter class="ml-6" />
              </span>
            </p>
            <div
              class="rounded-md bg-gray-200 hover:shadow-lg transition-shadow duration-300 shadow-md flex justify-center"
            >
              <img
                loading="lazy"
                alt="aaa"
                height="400"
                class="rounded-md"
                style="max-width: 100%; max-height: 400px"
                src="@/assets/img/composition-api.png"
              />
            </div>
          </div>

          <nuxt-content :document="article" />
          <prev-next :prev="prev" :next="next" />
          <lazy-article-comment />
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
          <lazy-mdi-transfer-up />
        </button-circle>
      </transition>
    </portal>
  </div>
</template>

<script lang="ts">
  import { PrevNext, Article } from '@/types/article'
  import { formatDate } from '@/utils/formatter'
  import { useRegisterCopyButton } from '@/utils/register'
  import { defineComponent, onMounted, ref } from 'nuxt-composition-api'

  export default defineComponent({
    head: {
      meta: [{ hid: 'og:type', property: 'og:type', name: 'og:type', content: 'article' }]
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

    setup() {
      useRegisterCopyButton()
      const isShow = ref(false)

      onMounted(() => {
        const images = document.querySelectorAll('.anchor')
        images.forEach((target) => onIntersect(target))
      })

      const onIntersect = (target: Element, options = {}) => {
        const observer = new IntersectionObserver(addShowClass, options)
        observer.observe(target)
      }

      const addShowClass = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            isShow.value = false
          } else {
            isShow.value = true
          }
        })
      }

      const scroll = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }

      return { formatDate, isShow, scroll }
    }
  })
</script>
