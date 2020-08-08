<template>
  <ul class="bg-white shadow-md mt-1 divide-y rounded-md p-3 hover:shadow-lg transition duration-300">
    <transition name="fade-up" mode="out-in">
      <h2 v-if="noHitted">No result found for query {{ keyword }}</h2>

      <div v-else>
        <h2 class="font-bold">Articles</h2>

        <transition-group name="fade-left">
          <nuxt-link
            v-for="article in articles"
            ref="link"
            :key="article.slug"
            class="hover:text-green-500 hover:bg-gray-300 transition duration-300 cursor-pointer text-right p-1 rounded font-normal"
            tag="li"
            :to="{ name: 'slug', params: { slug: article.slug } }"
            v-on="$listeners"
            v-html="highlight(article.title, keyword)"
          >
          </nuxt-link>
        </transition-group>
      </div>
    </transition>
  </ul>
</template>

<script lang="ts">
  import { Article } from '@/types/article'
  import { defineComponent, computed } from 'nuxt-composition-api'

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
      articles: {
        type: Array as () => Article[],
        default: []
      },

      keyword: {
        type: String,
        default: ''
      }
    },

    setup(props) {
      const noHitted = computed(() => !!props.keyword && !props.articles.length)
      return { highlight, noHitted }
    }
  })
</script>

<style scoped lang="scss">
  ul {
    &::after {
      position: absolute;
      top: -10px;
      left: 28px;
      width: 0;
      height: 0;
      content: '';
      border-right: 15px solid transparent;
      border-bottom: 20px solid white;
      border-left: 15px solid transparent;
    }
  }
</style>
