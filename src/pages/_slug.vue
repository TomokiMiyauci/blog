<template>
  <div>
    <nuxt-link
      class="inline-flex items-center dark:hover:text-nuxt-lightgreen light:hover:text-nuxt-lightgreen dark:text-dark-onSurfaceSecondary light:text-light-onSurfaceSecondary nuxt-link-active"
      to="/"
      >← Back to Home</nuxt-link
    >
    <article class="mt-12">
      <div class="flex md:grid grid-temp grid-cols-main">
        <toc class="hidden md:block" :toc="article.toc" />
        <div style="grid-column: 2 / 3;" class="p-2 overflow-hidden">
          <div class="mb-8">
            <BaseH1 :text="article.title" />
            <p class="mt-1 dark:text-dark-onSurfaceSecondary light:text-light-onSurfaceSecondary">
              {{ formatDate(article.updatedAt) }}
            </p>
          </div>
          <nuxt-content :document="article" />
          <prev-next :prev="prev" :next="next" />
        </div>

        <div class="hidden md:block p-4" style="grid-column: 3 / 3;">
          <tags-list class="lg:sticky lg:top-0 lg:pt-24 lg:-mt-24" :tags="['hello', 'world', 'blog']" />
        </div>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
  import { PrevNext, Article } from '@/types/article'
  import { formatDate } from '@/utils/formatter'
  import { useRegisterCopyButton } from '@/utils/register'
  import { defineComponent } from 'nuxt-composition-api'

  export default defineComponent({
    head: {
      meta: [{ hid: 'og:type', property: 'og:type', name: 'og:type', content: 'article' }]
    },

    async asyncData({ $content, params }) {
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
      return { formatDate }
    }
  })
</script>
