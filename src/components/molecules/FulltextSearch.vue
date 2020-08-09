<template>
  <div>
    <transition name="fade-down" mode="out-in">
      <div v-if="isShow" class="absolute px-3 inset-0 bg-white">
        <div class="relative w-full h-full flex justify-center items-center">
          <input-search v-model="searchQuery" class="w-full" @focus="isShow = true" @blur="isShow = false">
          </input-search>

          <transition name="fade-down" mode="out-in">
            <search-result
              v-show="searchQuery"
              class="absolute w-full top-11/12 right-auto left-0"
              :keyword="searchQuery"
              @click="searchQuery = ''"
            />
          </transition>
        </div>
      </div>
      <button-circle v-else class="md:hidden" @click="isShow = true">
        <mdi-magnify />
      </button-circle>
    </transition>

    <!-- <input-search
      v-model="searchQuery"
      class="hidden md:inline-flex items-center align-middle justify-center"
      :is-show="isShow"
      @focus="isShow = true"
      @blur="isShow = false"
    /> -->
    <!-- <transition name="fade-down">
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
    </transition> -->
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'nuxt-composition-api'

  export default defineComponent({
    setup() {
      const articles = ref<Promise<{ slug: string; title: string }[]> | null>(null)
      const searchQuery = ref('')
      const isShow = ref(false)
      const link = ref<HTMLLIElement[]>()

      return { articles, isShow, searchQuery, link }
    }
  })
</script>
