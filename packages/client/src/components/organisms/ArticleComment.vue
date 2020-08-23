<template>
  <div>
    <h2 class="mb-5 text-2xl">
      <lazy-mdi-comment-text-multiple /><span class="ml-2">{{ $t('COMMENT.HEADER') }}</span
      ><span class="px-2 shadow ml-2 rounded-full bg-red-500">{{ commentCount }}</span>
    </h2>
    <portal to="notice">
      <lazy-snackbar-success ref="snackbar" />
    </portal>
    <div class="flex items-start">
      <lazy-mdi-account width="48" height="48" class="p-3 bg-gray-300 rounded-md shadow dark:text-teal-900" />
      <lazy-textarea-comment v-model="newCommentRef" class="ml-2" />
      <lazy-button-send :disabled="!isPostable" @click="onSend" />
    </div>

    <lazy-comment-list :comments="commentsRef" class="mt-8" />
  </div>
</template>

<script lang="ts">
  import type BaseSnackbar from '@/components/molecules/BaseSnackbar.vue'
  import { Comment } from '@/types/firestore'
  import { defineComponent, ref, computed } from 'nuxt-composition-api'

  const useComment = () => {
    const commentsRef = ref<Comment[]>([])
    const newCommentRef = ref<string>('')
    const onSend = (): void => {
      if (!isPostable.value) return
      commentsRef.value = [
        ...commentsRef.value,
        { id: (commentsRef.value.length + 1).toString(), createdAt: new Date(), value: newCommentRef.value }
      ]
      newCommentRef.value = ''
    }

    const isPostable = computed<boolean>(() => {
      const result = newCommentRef.value.trim().match(/\S/g)

      return !!result && !!result.length
    })

    const commentCount = computed(() => {
      return commentsRef.value.length
    })

    return { onSend, commentsRef, newCommentRef, isPostable, commentCount }
  }
  export default defineComponent({
    setup() {
      const { onSend, commentsRef, newCommentRef, isPostable, commentCount } = useComment()

      const snackbar = ref<InstanceType<typeof BaseSnackbar>>()

      return {
        commentsRef,
        newCommentRef,
        isPostable,
        snackbar,
        commentCount,
        onSend: () => {
          onSend()
          if (!snackbar.value) return
          snackbar.value.open()
        }
      }
    }
  })
</script>
