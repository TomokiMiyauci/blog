<template>
  <div class="flex flex-col justify-center lg:grid grid-temp">
    <section style="grid-column: 2 / 3;">
      <article-headline v-for="article in articles" :key="article.id" :headline="article" />
    </section>
    <div style="grid-column: 3 / 3;" class="p-4">
      <tags-list class="lg:sticky lg:top-0 lg:pt-24 lg:-mt-24" :tags="['hello', 'world', 'blog']" />
    </div>
  </div>
</template>

<script lang="ts">
  import { Headline } from '@/types/article'
  import { defineComponent } from 'nuxt-composition-api'
  export default defineComponent({
    head: {
      title: 'Home'
    },

    async asyncData({ $content }) {
      const headline: (keyof Headline)[] = ['title', 'description', 'slug', 'tags', 'readingTime', 'createdAt']
      const articles = await $content('articles').only(headline).fetch<Headline>()

      return { articles }
    }
  })
</script>

<style scoped>
  .grid-temp {
    grid-template-columns: 340px 1fr 240px;
  }
</style>
