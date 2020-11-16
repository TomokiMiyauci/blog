<template>
  <div>
    <div class="text-2xl lg:text-4xl xl:text-5xl mb-3">{{ $t('title') }}</div>

    <div class="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-4 sm:gap-x-2 md:gap-8">
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
