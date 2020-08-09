<template>
  <nuxt-link
    tag="article"
    :to="{ name: 'slug', params: { slug: headline.slug } }"
    class="bg-gray-100 dark:bg-blue-900 p-4 m-4 rounded-md flex flex-col-reverse lg:flex-row shadow-md cursor-pointer hover:bg-gray-300 hover:shadow-xl transition duration-300 ease-linear"
  >
    <div class="lg:w-2/3 mx-2">
      <base-nuxt-link class="text-2xl font-bold" :to="{ name: 'slug', params: { slug: headline.slug } }">
        {{ headline.title }}
      </base-nuxt-link>
      <p class="mt-5 mb-3">{{ headline.description }}</p>
      <component :is="i" />

      <h2 class="mt-5 flex justify-between">
        <span><mdi-calendar-edit class="mr-1" />{{ formatDate(headline.createdAt) }}</span>
        <span> <mdi-timer class="mr-1" />{{ headline.readingTime }}</span>
      </h2>
    </div>
    <div class="w-full p-4 bg-green-200 rounded shadow flex justify-center items-center lg:w-1/3">
      <nuxt-icon height="100" />
    </div>
  </nuxt-link>
</template>

<script lang="ts">
  import { Headline } from '@/types/article'
  import { formatDate } from '@/utils/formatter'
  import { defineComponent } from 'nuxt-composition-api'

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
