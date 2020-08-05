<template>
  <nuxt-link
    tag="article"
    :to="{ name: 'slug', params: { slug: headline.slug } }"
    class="bg-gray-100 p-4 m-4 rounded-md flex shadow-md cursor-pointer hover:bg-gray-300 hover:shadow-xl transition duration-300 ease-linear"
  >
    <div class="lg:w-2/3">
      <base-nuxt-link class="text-2xl font-bold" :to="{ name: 'slug', params: { slug: headline.slug } }">
        {{ headline.title }}
      </base-nuxt-link>
      <p class="mt-5 mb-3">{{ headline.description }}</p>
      <component :is="i" />

      <h2 class="mt-5">{{ formatDate(headline.createdAt) }} {{ headline.readingTime }}</h2>
    </div>
    <div class="w-full bg-green-200 rounded shadow flex justify-center items-center lg:w-1/3">
      <nuxt-icon height="100" />
    </div>
  </nuxt-link>
</template>

<script lang="ts">
  import { Headline } from '@/types/article'
  import { defineComponent } from 'nuxt-composition-api'
  const formatDate = (date: Date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleDateString('en', options)
  }
  export default defineComponent({
    components: {
      TagNuxtjs: () => import('@/components/atoms/tags/TagNuxtjs.vue')
    },
    props: {
      headline: {
        type: Object as () => Headline,
        required: true
      }
    },

    setup() {
      return { i: 'TagNuxtjs', formatDate }
    }
  })
</script>
