<template>
  <section>
    <article-headline v-for="article in articles" :key="article.id" :headline="article" />
  </section>
</template>

<script lang="ts">
  import { Headline } from '@/types/article'
  import { defineComponent } from 'nuxt-composition-api'
  export default defineComponent({
    async asyncData({ $fireStore, $content, params }) {
      const { uid } = params
      if (!uid) return
      const result = await $fireStore
        .collection('users')
        .doc(uid)
        .collection('likedArticles')
        .get()
        .catch(() => {})
      if (!result) return
      let titles: string[] = []
      result.forEach(({ id }) => (titles = [...titles, id]))

      const headline: (keyof Headline)[] = ['title', 'description', 'slug', 'tags', 'readingTime', 'createdAt']
      const articles = await $content('articles')
        .where({ slug: { $in: titles } })
        .only(headline)
        .fetch<Headline[]>()

      return { articles }
    }
  })
</script>
