<template>
  <nuxt-link
    tag="article"
    :to="localePath({ name: 'post-slug', params: { slug: headline.slug } })"
    class="bg-gray-100 dark:bg-gray-900 m-2 max-w-sm rounded-md overflow-hidden flex mx-auto shadow-md cursor-pointer hover:bg-gray-200 hover:scale-105 transform hover:shadow-xl hover:opacity-90 transition duration-200 ease-in"
  >
    <div>
      <img class="h-48 w-full" loading="lazy" style="max-height: 300px" :alt="headline.alt" :src="headline.img" />

      <div class="p-4">
        <div class="flex justify-end mb-1">
          <calendar-edit-date :date="new Date(headline.createdAt)" />
          <timer-reading-time class="pl-2" :text="headline.readingTime" />
        </div>
        <nuxt-link
          tag="h2"
          class="text-2xl hover:text-green-500 transition duration-300 font-bold"
          :to="localePath({ name: 'post-slug', params: { slug: headline.slug } })"
        >
          {{ headline.title }}
        </nuxt-link>
        <p class="mt-3 mb-3">{{ headline.description }}</p>
        <!-- <nuxt-link :to="localePath({ name: 'slug', params: { slug: headline.slug } })">Learn More</nuxt-link> -->
        <!-- <tags :tags="headline.tags" /> -->
        <base-tag v-for="tag in headline.tags" :key="tag" :name="tag" is-small />
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
  import CalendarEditDate from '@/components/atoms/icontexts/CalendarEditDate.vue'
  import TimerReadingTime from '@/components/atoms/icontexts/TimerReadingTime.vue'
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

    components: {
      CalendarEditDate,
      TimerReadingTime
    },

    setup() {
      return { formatDate }
    }
  })
</script>
