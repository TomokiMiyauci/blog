<template>
  <div>
    <section>
      <article-headline v-for="article in articles" :key="article.id" :headline="article" />
    </section>
    <tags-list :tags="['hello', 'world', 'blog']" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'nuxt-composition-api'
  const formatDate = (date: Date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleDateString('en', options)
  }
  export default defineComponent({
    async asyncData({ $content }) {
      const articles = await $content('articles').only(['title', 'description', 'slug', 'tags']).fetch()
      return { articles }
    },

    setup() {
      return { formatDate }
    }
  })
</script>
