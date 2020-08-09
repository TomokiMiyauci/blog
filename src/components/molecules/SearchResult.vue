<template>
  <Promised
    tag="div"
    :promise="articlesPromise"
    class="bg-white dark:bg-gray-600 shadow-md mt-1 rounded-md p-3 hover:shadow-lg transition duration-300"
  >
    <template #pending>
      <div class="flex justify-center">
        <spin-loader />
      </div>
    </template>
    <template #rejected="error">
      <div class="flex">
        <mdi-alert /><span class="ml-1">{{ error }}</span>
      </div>
    </template>
    <template #default="articles">
      <transition name="fade">
        <div v-if="articles.length">
          <h2 class="font-bold">Articles</h2>

          <ul class="divide-y">
            <nuxt-link
              v-for="article in articles"
              ref="link"
              :key="article.slug"
              class="hover:text-green-500 hover:bg-gray-300 transition duration-300 cursor-pointer text-right p-1 rounded font-normal"
              tag="li"
              :to="{ name: 'slug', params: { slug: article.slug } }"
              @click.native.prevent="$emit('click')"
              v-html="highlight(article.title, keyword)"
            >
            </nuxt-link>
          </ul>
        </div>

        <h2 v-else class="flex">
          <mdi-information /><span class="ml-1">No hit {{ keyword }}</span>
        </h2>
      </transition>
    </template>
  </Promised>
</template>

<script lang="ts">
  // import { Article } from '@/types/article'
  import { defineComponent, watch, ref } from 'nuxt-composition-api'
  import { Promised } from 'vue-promised'

  // const wait = (milliseconds: number) => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve()
  //     }, milliseconds)
  //   })
  // }

  const highlight = (text: string, search: string): string => {
    if (search) {
      const searchRegExp = new RegExp(search, 'ig')
      return text.replace(
        searchRegExp,
        (match) => `<mark class="bg-green-200 rounded text-green-900 font-bold">${match}</mark>`
      )
    }
    return text
  }
  export default defineComponent({
    props: {
      keyword: {
        type: String,
        default: ''
      }
    },

    components: {
      Promised
    },

    setup(props, { root }) {
      const asyncSearch = (query: string) => {
        return root
          .$content('articles')
          .limit(3)
          .search(query)
          .only(['title', 'slug'])
          .fetch<{ slug: string; title: string }[]>()
      }

      const articlesPromise = ref<Promise<{ slug: string; title: string }[]> | null>(null)

      watch(
        () => props.keyword,
        (now) => {
          if (!now) {
            return
          }

          articlesPromise.value = asyncSearch(now)
        }
      )

      return { highlight, articlesPromise }
    }
  })
</script>

<style scoped lang="scss">
  div {
    &::after {
      @apply absolute w-0 h-0;

      top: -15px;
      left: 25px;
      content: '';
      border-right: 15px solid transparent;
      border-bottom: 20px solid white;
      border-left: 15px solid transparent;
    }
  }

  .dark-mode {
    div {
      &::after {
        border-bottom-color: #718096;
      }
    }
  }
</style>
