<template>
  <div>
    <base-h-1 :text="title" />
    <p class="text-base sm:text-lg mb-4">{{ description }}</p>
    <tags :tags="tags" />
    <div class="mt-4 flex flex-col">
      <span class="inline-flex mb-4 items-center justify-end">
        <button-like />
        <view-counter class="ml-6" />
      </span>
      <div class="flex justify-between">
        <calendar-edit-date :date="new Date(updatedAt)" />
        <timer-reading-time :text="readingTime" />
      </div>
    </div>
    <div class="mt-3 mx-auto">
      <img
        loading="lazy"
        alt="cover"
        width="1600"
        class="rounded-md shadow-md transition-shadow duration-300 hover:shadow-xl"
        :src="thumbnail"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import BaseH1 from '@/components/atoms/BaseH1.vue'
  import CalendarEditDate from '@/components/atoms/icontexts/CalendarEditDate.vue'
  import TimerReadingTime from '@/components/atoms/icontexts/TimerReadingTime.vue'
  import ButtonLike from '@/components/favorite/molecules/ButtonLike.vue'
  import ViewCounter from '@/components/molecules/ViewCounter.vue'
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
      CalendarEditDate
    }
  })
</script>
