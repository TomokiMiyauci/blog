<template>
  <div>
    <!-- <div class="h-screen-80 absolute top-0 bg-red-700 w-full" style="z-index: -10" /> -->
    <div
      class="bg-gradient-to-b dark:via-teal-700 via-teal-300 from-white dark:from-gray-800 dark:to-gray-800 to-white px-4 pb-84 pt-8 sm:pt-16"
    >
      <div class="container mb-5 pb-5">
        <base-h-1 :text="title" />
        <p class="leading-relaxed xl:text-3xl lg:text-2xl md:text-xl sm:text-lg mt-6 md:mt-12 mb-4">
          {{ description }}
        </p>
        <!-- <base-tag v-for="tag in tags.sort()" :key="tag" class="mr-4" :name="tag" linkable :value="toKebabCase(tag)" /> -->
        <div class="mt-4 flex flex-col">
          <span class="inline-flex mb-4 items-center justify-end md:justify-center">
            <button-like />
            <view-counter class="ml-8" />
          </span>
          <div class="flex justify-between md:justify-center">
            <calendar-edit-date :date="new Date(updatedAt)" />
            <timer-reading-time class="ml-8" :text="readingTime" />
          </div>
        </div>
      </div>
    </div>
    <article-thumbnail class="-mt-84 px-4 sm:px-0" :thumbnail="thumbnail" />
  </div>
</template>

<script lang="ts">
  import ArticleThumbnail from '@/components/article/moledules/ArticleThumbnail.vue'
  import BaseH1 from '@/components/atoms/BaseH1.vue'
  import CalendarEditDate from '@/components/atoms/icontexts/CalendarEditDate.vue'
  import TimerReadingTime from '@/components/atoms/icontexts/TimerReadingTime.vue'
  import ButtonLike from '@/components/favorite/molecules/ButtonLike.vue'
  import ViewCounter from '@/components/molecules/ViewCounter.vue'
  import { toKebabCase } from '@/utils/formatter'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    props: {
      title: {
        type: String,
        default: ''
      },

      description: {
        type: String,
        default: ''
      },

      readingTime: {
        type: String,
        default: '0 min read'
      },

      tags: {
        type: Array as () => string[],
        default: () => []
      },

      updatedAt: {
        type: String,
        default: ''
      },

      thumbnail: {
        type: String,
        default: ''
      }
    },

    components: {
      BaseH1,
      ButtonLike,
      ViewCounter,
      TimerReadingTime,
      CalendarEditDate,
      ArticleThumbnail
    },

    setup() {
      return { toKebabCase }
    }
  })
</script>
