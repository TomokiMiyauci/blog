<template>
  <div>
    <div class="text-2xl mb-3">{{ $t('title') }}</div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <article-current v-for="article in articles" :key="article.slug" class="mx-auto" :article="article" />
    </div>
  </div>
</template>

<script lang="ts">
  import ArticleCurrent from '@/components/article/moledules/ArticleCurrent.vue'
  import { Current as CurrentArticle } from '@/types/article'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    props: {
      articles: {
        type: Array as () => CurrentArticle[],
        default: () => []
      }
    },
    components: {
      ArticleCurrent
    }
  })
</script>

<i18n lang="yml">
en:
  title: Current Articles
ja:
  title: 最新の記事
</i18n>
