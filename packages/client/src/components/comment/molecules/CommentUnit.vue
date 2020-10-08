<template>
  <div
    class="flex min-w-0 items-start hover:bg-gray-300 dark-hover:bg-gray-900 dark-hover:shadow transition duration-300 rounded-md hover:shadow-md shadow p-3 pl-5"
  >
    <mdi-account />
    <div class="ml-4 w-full">
      <p class="flex">
        <span class="font-bold text-md">{{ mask }}</span
        ><span class="mx-1">{{ separation }}</span
        ><span>{{ formatDate(timestamp2Date(createdAt), $i18n.locale) }}</span>
      </p>
      <div class="break-all whitespace-pre-wrap">{{ text }}</div>
    </div>

    <comment-delete v-if="isOwn" :id="id" v-on="$listeners" />
    <report-violation v-else :id="id" />
  </div>
</template>

<script lang="ts">
  import MdiAccount from '@/components/atoms/icons/MdiAccount.vue'
  import CommentDelete from '@/components/comment/molecules/CommentDelete.vue'
  import ReportViolation from '@/components/comment/molecules/ReportViolation.vue'
  import { Comment } from '@/types/firestore'
  import { formatDate, timestamp2Date } from '@/utils/formatter'
  import { defineComponent } from '@nuxtjs/composition-api'

  const mask = '***'
  const separation = '・'

  export default defineComponent({
    props: {
      id: {
        type: String,
        required: true
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

    components: {
      MdiAccount,
      CommentDelete,
      ReportViolation
    },

    setup() {
      return { formatDate, timestamp2Date, mask, separation }
    }
  })
</script>
