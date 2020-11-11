<template>
  <nuxt-link
    tag="article"
    :to="localePath({ name: 'post-slug', params: { slug: article.slug } })"
    class="bg-gray-100 w-full dark:bg-gray-900 rounded-md overflow-hidden shadow-md cursor-pointer hover:bg-gray-200 hover:scale-105 transform hover:shadow-xl hover:opacity-90 transition duration-200 ease-in"
  >
    <div>
      <img class="h-48 w-full" loading="lazy" :alt="alt" :src="article.img" />

      <div class="p-4">
        <nuxt-link
          tag="h2"
          class="text-3xl hover:text-green-500 transition duration-300"
          :to="localePath({ name: 'post-slug', params: { slug: article.slug } })"
        >
          {{ article.title }}
        </nuxt-link>
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
  import { Current } from '@/types/article'
  import { defineComponent } from '@nuxtjs/composition-api'
  export default defineComponent({
    props: {
      article: {
        type: Object as () => Current,
        required: true
      }
    }
  })
</script>
