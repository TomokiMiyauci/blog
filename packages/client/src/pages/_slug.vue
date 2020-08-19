<template>
  <div>
    <nuxt-link
      class="inline-flex items-center dark:hover:text-nuxt-lightgreen light:hover:text-nuxt-lightgreen dark:text-dark-onSurfaceSecondary light:text-light-onSurfaceSecondary nuxt-link-active"
      :to="localePath('/')"
      >← Back to Home</nuxt-link
    >
    <!-- <div>
      <lazy-button-favorite v-if="liked" @click="liked = false" />
      <lazy-button-favorite v-else class="bg-gray-200" @click="onC">hellio</lazy-button-favorite>
    </div> -->
    <article class="mt-12">
      <div class="flex md:grid grid-temp grid-cols-main">
        <toc class="hidden md:block" :toc="article.toc" />
        <div style="grid-column: 2 / 3;" class="p-2 overflow-hidden">
          <div class="mb-8">
            <BaseH1 :text="article.title" />
            <p class="mt-1 flex justify-between">
              {{ formatDate(article.updatedAt) }}<span><viewer-counter :text="viewCount" /></span>
            </p>
          </div>

          <nuxt-content :document="article" />
          <prev-next :prev="prev" :next="next" />
        </div>

        <div class="hidden md:block p-4" style="grid-column: 3 / 3;">
          <tags-list class="lg:sticky lg:top-0 lg:pt-24 lg:-mt-24" :tags="['hello', 'world', 'blog']" />
        </div>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
  import { user } from '@/store'
  import { PrevNext, Article } from '@/types/article'
  import { formatDate } from '@/utils/formatter'
  import { useRegisterCopyButton } from '@/utils/register'
  import { defineComponent, useAsync } from 'nuxt-composition-api'

  export default defineComponent({
    head: {
      meta: [{ hid: 'og:type', property: 'og:type', name: 'og:type', content: 'article' }]
    },

    async asyncData({ params, $content }) {
      const article = await $content('articles', params.slug).fetch<Article>()

      const [prev, next] = await $content('articles')
        .only(['title', 'slug'])
        .sortBy('date', 'desc')
        .surround(params.slug, { before: 1, after: 1 })
        .fetch<[PrevNext, PrevNext]>()

      return { article, prev, next }
    },

    setup(_, { root }) {
      const slug = root.$route.params.slug
      const docRef = root.$fireStore.collection('articles').doc(slug)

      const liked = useAsync(async () => {
        const { exists } = await docRef.collection('likedUsers').doc(user.id).get()
        return exists
      })

      const onC = async () => {
        await docRef.collection('likedUsers').doc(user.id).delete()
        liked.value = true
      }

      const viewCount = useAsync(async () => {
        const result = await docRef.get()
        return result.data()!.view
      })

      useRegisterCopyButton()
      return { formatDate, viewCount, liked, onC }
    }
  })
</script>
