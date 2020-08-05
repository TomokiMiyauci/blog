<template>
  <section>
    <article-headline v-for="article in articles" :key="article.id" :headline="article" />
  </section>
</template>

<script lang="ts">
  import { Headline } from '@/types/article'
  import { defineComponent } from 'nuxt-composition-api'
  export default defineComponent({
    async asyncData({ $content }) {
      const articles = await $content('articles')
        .only(['title', 'description', 'slug', 'tags', 'readingTime', 'createdAt'])
        .fetch<Headline>()
      return { articles }
    }
  })
</script>
