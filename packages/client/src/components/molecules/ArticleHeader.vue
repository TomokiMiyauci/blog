<template>
  <div>
    <base-h-1 :text="title" />
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
    <div
      class="mt-3 rounded-md bg-gray-200 hover:shadow-lg transition-shadow duration-300 shadow-md flex justify-center"
    >
      <img
        loading="lazy"
        alt="cover"
        height="400"
        class="rounded-md"
        style="max-width: 100%; max-height: 400px"
        :src="thumbnail"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    props: {
      title: {
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
    }
  })
</script>
