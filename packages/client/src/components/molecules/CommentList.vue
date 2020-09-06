<template>
  <div>
    <transition name="fade-right" mode="out-in">
      <div v-if="!comments.length" class="min-h-full text-center text-xl">
        <mdi-comment-processing /><span class="ml-2">{{ $t('COMMENT.NO') }}</span>
      </div>
      <transition-group v-else tag="div" name="fade-right">
        <div
          v-for="comment in comments"
          :key="comment.id"
          class="flex min-w-0 items-start hover:bg-gray-300 dark-hover:bg-gray-900 dark-hover:shadow transition duration-300 rounded-md hover:shadow p-3 pl-5"
        >
          <mdi-account />
          <div class="ml-4 w-full">
            <p class="flex">
              <span class="font-bold text-md">*** ・</span
              ><span>{{ formatDate(timestamp2Date(comment.createdAt), $i18n.locale) }}</span>
            </p>
            <div class="break-all whitespace-pre-wrap">{{ comment.text }}</div>
          </div>

          <comment-delete v-if="isEqual(comment.userRef)" :id="comment.id" v-on="$listeners" />
          <report-violation v-else :id="comment.id" />
        </div>
      </transition-group>
    </transition>
  </div>
</template>

<script lang="ts">
  import { Comment } from '@/types/firestore'
  import { userDoc } from '@/utils/firestore-reference'
  import { formatDate, timestamp2Date } from '@/utils/formatter'
  import { defineComponent, useContext } from '@nuxtjs/composition-api'

  const useUser = () => {
    const ctx = useContext()
    const isEqual = (reference: ReturnType<typeof userDoc>) => {
      return userDoc(ctx).isEqual(reference)
    }

    return { isEqual }
  }

  export default defineComponent({
    props: {
      comments: {
        type: Array as () => Comment[],
        default: []
      }
    },

    setup() {
      return { formatDate, timestamp2Date, ...useUser() }
    }
  })
</script>
