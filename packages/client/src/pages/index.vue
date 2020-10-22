<template>
  <div>
    <div class="bg-gradient-to-r opacity-90 from-teal-300 to-gray-700 dark:from-gray-800 dark:to-gray-900">
      <div class="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 pt-20 pb-20 flex flex-col items-center">
        <sub-logo />
      </div>
    </div>
    <div class="row mb-16">
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

      <div class="md:col" />

      <section
        class="grid col-12 p-3 lg:p-2 lg:col-9 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-0 sm:gap-x-4 md:gap-x-4 glow-blue-100"
      >
        <article-headline v-for="article in articles" :key="article.id" class="mx-auto" :headline="article" />
      </section>

      <!-- <div class="p-4">
        <tags-list class="lg:sticky lg:top-0 lg:pt-24 lg:-mt-24" :tags="['hello', 'world', 'blog']" />
      </div> -->
      <div class="col p-3">
        <h3>Tags</h3>
        <span v-for="(tag, index) in tags" :key="index">
          <span v-for="t in tag" :key="t" class="inline-flex rounded-full px-3 m-2 py-1 shadow"># {{ t }}</span>
        </span>
      </div>
    </div>

    <nuxt-link
      v-for="article in articles"
      :key="article.id"
      class="hidden"
      :to="localePath({ name: 'post-slug', params: { slug: article.slug } })"
    />
    <portal to="bottom-right">
      <chat />
    </portal>
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

    async asyncData({ $content, app }) {
      const articles = (await $content('articles', app.i18n.locale)
        .only(headline)
        .where({ private: false })
        .fetch<Headline[]>()) as Headline[]

      const tags = articles.map(({ tags }) => tags)

      return { articles, tags }
    },

    setup() {
      // const favariteArticle = useAsync(() => useFavariteArticle())

      return { userId: user.id }
    }
  })
</script>
