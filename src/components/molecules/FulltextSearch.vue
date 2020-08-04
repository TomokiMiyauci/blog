<template>
  <div>
    <!-- <button ref="link">hhh</button> -->
    <button-circle class="md:hidden">
      <mdi-magnify />
    </button-circle>
    <input-search
      v-model="searchQuery"
      class="hidden md:inline-flex items-center justify-cente"
      :is-show="isShow"
      @focus="isShow = true"
      @blur="isShow = false"
    />
    <transition name="fade-down">
      <ul
        v-if="isShow && articles.length"
        class="bg-white shadow-md absolute w-64 mt-1 divide-y rounded-md p-3 hover:shadow-lg transition duration-300"
      >
        <h2 class="font-bold">Articles</h2>
        <nuxt-link
          v-for="article in articles"
          ref="link"
          :key="article.slug"
          tabindex="0"
          class="hover:text-green-500 hover:bg-gray-300 transition duration-300 cursor-pointer text-right p-1 rounded font-normal"
          tag="li"
          :to="{ name: 'slug', params: { slug: article.slug } }"
          @click.native.prevent="searchQuery = ''"
          v-html="highlight(article.title, searchQuery)"
        >
        </nuxt-link>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts">
  import { defineComponent, watch, ref } from 'nuxt-composition-api'
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
    setup(_, { root }) {
      const articles = ref<{ slug: string; title: string }[]>([])
      const searchQuery = ref('')
      const isShow = ref(false)
      const link = ref<HTMLLIElement[]>()

      // const fo = () => {
      //   if (!link.value) return
      //   const a = link.value[0]
      //   root.$router.push(a.to)
      //   console.log(a.to, a)
      // }

      watch(searchQuery, async (now) => {
        if (!now) {
          articles.value = []
          return
        }

        articles.value = await root.$content('articles').limit(3).search(now).fetch()
      })

      return { articles, isShow, searchQuery, link, highlight }
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
