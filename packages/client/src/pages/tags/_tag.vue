<template>
  <div>
    <article-headline v-for="article in articles" :key="article.id" :headline="article" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api'
  export default defineComponent({
    async asyncData({ $content, params }) {
      const articles = await $content('articles')
        .where({ tags: { $in: params.tag } })
        .fetch()

      return { articles }
    }
  })
</script>
