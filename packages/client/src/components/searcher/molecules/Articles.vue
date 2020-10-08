<template>
  <div>
    <h2>{{ $t('articles') }}</h2>

    <ul class="divide-y">
      <result v-for="article in articles" :key="article.slug" tag="li" v-bind="article" v-on="$listeners" />
    </ul>
  </div>
</template>

<script lang="ts">
  import Result from '@/components/searcher/atoms/Result.vue'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    props: {
      articles: {
        type: Array as () => { title: string; slug: string; keyword: string }[],
        default: () => []
      }
    },

    components: {
      Result
    }
  })
</script>

<i18n lang="yml">
en:
  articles: ARTICLES
ja:
  articles: 記事
</i18n>
