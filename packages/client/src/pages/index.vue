<template>
  <div class="flex flex-col justify-center lg:grid grid-temp">
    <!-- <div v-if="favariteArticle">
      <h2>
        <nuxt-link
          :to="
            localePath({
              name: 'users-uid',
              params: {
                uid: userId
              }
            })
          "
          ><mdi-heart /><span class="ml-1">Articles</span></nuxt-link
        >
      </h2>
      <article-headline v-for="article in favariteArticle" :key="article.slug" :headline="article" />
    </div> -->
    <!--
    <portal to="hello">
      <div>hello</div>
    </portal> -->

    <section style="grid-column: 2 / 3;">
      <article-headline v-for="article in articles" :key="article.id" :headline="article" />
    </section>
    <div style="grid-column: 3 / 3;" class="p-4">
      <tags-list class="lg:sticky lg:top-0 lg:pt-24 lg:-mt-24" :tags="['hello', 'world', 'blog']" />
    </div>
  </div>
</template>

<script lang="ts">
  import { user } from '@/store'
  import { Headline } from '@/types/article'
  import { defineComponent } from 'nuxt-composition-api'

  const headline: (keyof Headline)[] = ['title', 'description', 'slug', 'tags', 'readingTime', 'createdAt']

  // const useFavariteArticle = async () => {
  //   const { $content } = useContext()
  //   const favariteArticle = await $content('articles', 'h').only(headline).fetch<Headline>()
  //   return [favariteArticle]
  // }
  export default defineComponent({
    head: {
      title: 'Home'
    },

    async asyncData({ $content }) {
      const articles = await $content('articles').only(headline).fetch<Headline[]>()

      return { articles }
    },

    setup() {
      // const favariteArticle = useAsync(() => useFavariteArticle())

      return { userId: user.id }
    }
  })
</script>

<style scoped>
  .grid-temp {
    grid-template-columns: 340px 1fr 240px;
  }
</style>
