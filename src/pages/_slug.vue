<template>
  <div>
    <nuxt-link
      class="inline-flex items-center dark:hover:text-nuxt-lightgreen light:hover:text-nuxt-lightgreen dark:text-dark-onSurfaceSecondary light:text-light-onSurfaceSecondary nuxt-link-active"
      to="/"
      >← Back to Home</nuxt-link
    >
    <article class="mt-12">
      <div class="grid grid-temp">
        <toc :toc="article.toc" />
        <div style="grid-column: 2 / 3;">
          <div class="mb-8">
            <BaseH1 :text="article.title" />
            <p class="mt-1 dark:text-dark-onSurfaceSecondary light:text-light-onSurfaceSecondary">
              {{ formatDate(article.updatedAt) }}
            </p>
          </div>
          <nuxt-content :document="article" />
          <prev-next :prev="prev" :next="next" />
        </div>

        <div style="grid-column: 3 / 3;" class="p-4">
          <tags-list class="lg:sticky lg:top-0 lg:pt-24 lg:-mt-24" :tags="['hello', 'world', 'blog']" />
        </div>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
  import { PrevNext } from '@/types/article'
  import { formatDate } from '@/utils/formatter'
  import { defineComponent } from 'nuxt-composition-api'

  export default defineComponent({
    async asyncData({ $content, params }) {
      const article = await $content('articles', params.slug).fetch()

      const [prev, next] = await $content('articles')
        .only(['title', 'slug'])
        .sortBy('date', 'desc')
        .surround(params.slug, { before: 1, after: 1 })
        .fetch<[PrevNext, PrevNext]>()

      return { article, prev, next }
    },

    setup() {
      return { formatDate }
    }
  })
</script>

<style scoped>
  .grid-temp {
    grid-template-columns: 340px 1fr 240px;
    width: calc(100% - 50px);
  }
</style>
