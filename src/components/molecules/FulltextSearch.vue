<template>
  <div>
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
      <ul v-if="isShow && articles.length" class="bg-white absolute border mt-1 divide-y rounded-md p-3">
        <h2 class="font-bold">Articles</h2>
        <li v-for="article in articles" :key="article.slug" class="hover:text-green-700 text-right p-1 font-nomal">
          <nuxt-link :to="`/${article.slug}`" @click.native.prevent="searchQuery = ''">
            {{ article.title }}
          </nuxt-link>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts">
  import { defineComponent, watch, ref } from 'nuxt-composition-api'
  export default defineComponent({
    setup(_, { root }) {
      const articles = ref<{ slug: string; title: string }[]>([])
      const searchQuery = ref('')
      const isShow = ref(false)

      watch(searchQuery, async (now) => {
        if (!now) {
          articles.value = []
          return
        }

        articles.value = await root.$content('articles').limit(3).search(now).fetch()
      })

      return { articles, isShow, searchQuery }
    }
  })
</script>
