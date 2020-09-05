<template>
  <nuxt-link
    tag="article"
    :to="localePath({ name: 'slug', params: { slug: headline.slug } })"
    class="bg-gray-100 dark:bg-gray-900 p-4 m-4 rounded-md flex flex-col-reverse lg:flex-row shadow-md cursor-pointer hover:bg-gray-300 hover:shadow-xl transition duration-300 ease-linear"
  >
    <div class="lg:w-2/3 mx-2">
      <nuxt-link class="text-2xl font-bold" :to="localePath({ name: 'slug', params: { slug: headline.slug } })">
        {{ headline.title }}
      </nuxt-link>
      <p class="mt-5 mb-3">{{ headline.description }}</p>
      <tags :tags="headline.tags" />

      <h2 class="mt-5 flex justify-between">
        <calendar-edit-date :date="new Date(headline.createdAt)" />
        <timer-reading-time :text="headline.readingTime" />
      </h2>
    </div>
    <img
      class="rounded-md hover:shadow-xl transition-shadow duration-300 shadow lg:w-1/2"
      height="300"
      loading="lazy"
      style="height: 100%; max-height: 300px"
      :alt="headline.alt"
      :src="headline.img"
    />
  </nuxt-link>
</template>

<script lang="ts">
  import { Headline } from '@/types/article'
  import { formatDate } from '@/utils/formatter'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    props: {
      headline: {
        type: Object as () => Headline,
        required: true
      }
    },

    setup() {
      return { formatDate }
    }
  })
</script>
