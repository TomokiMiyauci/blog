<template>
  <div>
    <div class="bg-gradient-to-r opacity-90 from-teal-300 to-gray-700 dark:from-gray-800 dark:to-gray-900">
      <div class="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 pt-20 pb-20 flex flex-col items-center">
        <sub-logo />
      </div>
    </div>
    <div class="container mx-auto mb-16 px-3">
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

      <section class="grid grid-cols-1 sm:grid-cols-2 mt-5 lg:grid-cols-3">
        <article-headline v-for="article in articles" :key="article.id" :headline="article" />
      </section>
      <!-- <div class="p-4">
        <tags-list class="lg:sticky lg:top-0 lg:pt-24 lg:-mt-24" :tags="['hello', 'world', 'blog']" />
      </div> -->
      <portal to="bottom-right">
        <chat />
      </portal>
    </div>
  </div>
</template>

<script lang="ts">
  import { user } from '@/store'
  import { Headline } from '@/types/article'
  import { defineComponent } from '@nuxtjs/composition-api'

  const headline: (keyof Headline)[] = [
    'title',
    'description',
    'slug',
    'tags',
    'alt',
    'img',
    'readingTime',
    'createdAt'
  ]

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
      const articles = await $content('articles').only(headline).where({ private: false }).fetch<Headline[]>()

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
