<template>
  <div>
    <transition name="fade-right" mode="out-in">
      <div v-if="!comments.length" class="min-h-full text-center text-xl">
        <lazy-mdi-comment-processing /><span class="ml-2">{{ $t('COMMENT.NO') }}</span>
      </div>
      <transition-group v-else tag="div" name="fade-right">
        <div
          v-for="comment in comments"
          :key="comment.id"
          class="flex min-w-0 items-start hover:bg-gray-300 dark-hover:bg-gray-900 dark-hover:shadow transition duration-300 rounded-md hover:shadow p-3 pl-5"
        >
          <lazy-mdi-account />
          <div class="ml-4 w-full">
            <p class="flex">
              <span class="font-bold text-md">*** ・</span
              ><span>{{ formatDate(timestamp2Date(comment.createdAt), $i18n.locale) }}</span>
            </p>
            <div class="break-all whitespace-pre-wrap">{{ comment.text }}</div>
          </div>
          <lazy-button-report class="ml-1" />

          <lazy-comment-delete :id="comment.id" v-on="$listeners" />
        </div>
      </transition-group>
    </transition>
  </div>
</template>

<script lang="ts">
  import { Comment } from '@/types/firestore'
  import { formatDate, timestamp2Date } from '@/utils/formatter'
  import { defineComponent } from 'nuxt-composition-api'

  export default defineComponent({
    props: {
      comments: {
        type: Array as () => Comment[],
        default: []
      }
    },

    setup() {
      return { formatDate, timestamp2Date }
    }
  })
</script>
