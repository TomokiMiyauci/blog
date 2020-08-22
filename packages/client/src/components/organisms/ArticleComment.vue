<template>
  <div>
    <h2 class="mb-5 text-2xl"><mdi-comment-text-multiple /><span class="ml-2">Comments</span></h2>
    <!-- <p>コミュニティガイドラインに沿ってコメント</p> -->
    <div class="flex">
      <mdi-account width="48" height="48" class="p-3 bg-gray-300 rounded-md shadow" />
      <textarea-comment v-model="newCommentRef" class="ml-2" />
      <lazy-button-send :disabled="!newCommentRef" @click="onSend" />
    </div>

    <lazy-comment-list :comments="commentsRef" class="mt-8" />
  </div>
</template>

<script lang="ts">
  import { Comment } from '@/types/firestore'
  import { defineComponent, ref } from 'nuxt-composition-api'

  const useComment = () => {
    const commentsRef = ref<Comment[]>([])
    const newCommentRef = ref<string>('')
    const onSend = () => {
      commentsRef.value = [
        ...commentsRef.value,
        { id: (commentsRef.value.length + 1).toString(), createdAt: new Date(), value: newCommentRef.value }
      ]
      newCommentRef.value = ''
    }

    return { onSend, commentsRef, newCommentRef }
  }
  export default defineComponent({
    setup() {
      return { ...useComment() }
    }
  })
</script>
