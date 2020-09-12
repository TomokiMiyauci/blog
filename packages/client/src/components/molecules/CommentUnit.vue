<template>
  <div
    class="flex min-w-0 items-start hover:bg-gray-300 dark-hover:bg-gray-900 dark-hover:shadow transition duration-300 rounded-md hover:shadow-md shadow p-3 pl-5"
  >
    <mdi-account />
    <div class="ml-4 w-full">
      <p class="flex">
        <span class="font-bold text-md">***</span><span class="mx-1">・</span
        ><span>{{ formatDate(timestamp2Date(createdAt), $i18n.locale) }}</span>
      </p>
      <div class="break-all whitespace-pre-wrap">{{ text }}</div>
    </div>

    <comment-delete v-if="isOwn" :id="id" v-on="$listeners" />
    <report-violation v-else :id="id" />
  </div>
</template>

<script lang="ts">
  import { Comment } from '@/types/firestore'
  import { formatDate, timestamp2Date } from '@/utils/formatter'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    props: {
      id: {
        type: String as () => Comment['id'],
        default: ''
      },

      text: {
        type: String as () => Comment['text'],
        default: ''
      },

      isOwn: {
        type: Boolean,
        default: true
      },

      createdAt: {
        type: Object as () => Comment['createdAt'],
        required: true
      }
    },

    setup() {
      return { formatDate, timestamp2Date }
    }
  })
</script>
