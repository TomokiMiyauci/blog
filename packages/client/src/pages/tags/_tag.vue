<template>
  <div>
    <div class="bg-gradient-to-r opacity-90 from-teal-300 to-gray-700 dark:from-gray-800 dark:to-gray-900">
      <div class="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 pt-20 pb-20 flex flex-col items-center">
        <span class="inline-flex items-center text-white"
          ><mdi-tag-text class="h-12 w-12" /> <span class="ml-4 text-6xl">{{ tag }}</span></span
        >
      </div>
    </div>

    <div class="row mb-16">
      <div class="md:col" />

      <section
        class="grid col-12 p-3 lg:p-2 lg:col-9 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-0 sm:gap-x-4 md:gap-x-4 glow-blue-100"
      >
        <article-headline v-for="article in taggedArticles" :key="article.id" class="mx-auto" :headline="article" />
      </section>

      <div class="col p-3">
        <tags-list :tags="tags" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Headline } from '@/types/article'
  import { toPascalCase } from '@/utils/formatter'
  import { defineComponent, useContext } from '@nuxtjs/composition-api'

  export default defineComponent({
    async asyncData({ $content, params, app }) {
      const taggedArticles = await $content('articles', app.i18n.locale)
        .where({ private: false, tags: { $contains: toPascalCase(params.tag) } })
        .fetch<Headline[]>()

      const articles = (await $content('articles', app.i18n.locale)
        .only(['tags'])
        .where({ private: false })
        .fetch<Headline[]>()) as Headline[]

      return { taggedArticles, tags: articles.map(({ tags }) => tags).flat() }
    },

    head() {
      return {
        title: this.tag as string
      }
    },

    setup() {
      const { params } = useContext()

      return { tag: toPascalCase(params.value.tag) }
    }
  })
</script>
