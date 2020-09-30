<template>
  <div ref="div">
    <h2 class="mb-5 text-2xl">
      <mdi-comment-text-multiple /><span class="ml-2">{{ $t('title') }}</span
      ><span class="px-2 shadow ml-2 rounded-full bg-red-500">{{ commentCount }}</span>
    </h2>
    <portal to="notice">
      <snackbar-success ref="snackbar" />
    </portal>
    <div class="flex items-start">
      <mdi-account width="48" height="48" class="p-3 bg-gray-300 rounded-md shadow dark:text-teal-900" />
      <textarea-comment v-model="newCommentRef" class="ml-2" />
      <button-send :disabled="!isPostable" @click="onSend" />
    </div>

    <portal v-if="isProcessing" to="center">
      <transition name="zoom-in">
        <div
          class="bg-gray-300 shadow-md dark:bg-gray-900 bg-opacity-75 transition-shadow duration-300 p-10 rounded-lg"
        >
          <spin-loader width="80" height="80" />
        </div>
      </transition>
    </portal>

    <comment-list :comments="commentsRef" class="mt-8" @delete="getComment" />
  </div>
</template>

<script lang="ts">
  import type BaseSnackbar from '@/components/molecules/BaseSnackbar.vue'
  import useIntersection from '@/core/intersection'
  import { user } from '@/store'
  import { Comment } from '@/types/firestore'
  import { articleCommentRef, userDoc } from '@/utils/firestore-reference'
  import { defineComponent, ref, computed, useContext, getCurrentInstance } from '@nuxtjs/composition-api'

  const useComment = () => {
    const ctx = useContext()
    const commentsRef = ref<Comment[]>([])
    // const commentsRef = ref<Comment[]>([
    //   { createdAt: Date as any, id: 'rkbABwsHkNrsbUzpyqKP', text: 'asfs', userRef: { id: 'hhiih' } as any }
    // ])
    const newCommentRef = ref<string>('')
    const isProcessing = ref<boolean>(false)

    const onSend = async (): Promise<void> => {
      if (!isPostable.value || isProcessing.value) return
      isProcessing.value = true
      if (!articleCommentRef(ctx)) {
        isProcessing.value = false
        return
      }

      await articleCommentRef(ctx)!.add({
        userRef: userDoc(ctx),
        text: newCommentRef.value,
        createdAt: ctx.$fireStoreObj.FieldValue.serverTimestamp()
      })

      await getComment()

      newCommentRef.value = ''
      isProcessing.value = false
    }

    const getComment = async (): Promise<void> => {
      if (!articleCommentRef(ctx)) {
        return
      }
      const result = await articleCommentRef(ctx)!.orderBy('createdAt', 'desc').limit(3).get()

      commentsRef.value = []

      result.forEach((doc) => {
        const { createdAt, text, userRef } = doc.data()
        commentsRef.value = [...commentsRef.value, { id: doc.id, createdAt, text, userRef }]
      })
    }

    const isPostable = computed<boolean>(() => {
      const result = newCommentRef.value.trim().match(/\S/g)

      return user.login && !!result && !!result.length
    })

    const commentCount = computed(() => {
      return commentsRef.value.length
    })

    return { onSend, commentsRef, newCommentRef, isPostable, commentCount, getComment, isProcessing }
  }

  export default defineComponent({
    setup() {
      const { onSend, commentsRef, newCommentRef, isPostable, commentCount, getComment, isProcessing } = useComment()

      const snackbar = ref<InstanceType<typeof BaseSnackbar>>()
      const div = ref<HTMLDivElement>()

      getCurrentInstance()!.$once('outersect', () => {
        getComment()
      })

      useIntersection(div)

      return {
        div,
        commentsRef,
        newCommentRef,
        isPostable,
        snackbar,
        commentCount,
        getComment,
        isProcessing,
        onSend: async () => {
          await onSend()
          if (!snackbar.value) return
          snackbar.value.open()
        }
      }
    }
  })
</script>

<i18n lang="yml">
en:
  title: Comments
ja:
  title: コメント
</i18n>
