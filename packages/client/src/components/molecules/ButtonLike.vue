<template>
  <span class="inline-flex items-center">
    <promised :promise="promiseIsLike">
      <template #pending>
        <mdi-heart />
      </template>
      <template #default="isLike">
        <button-favorite v-if="isLike" class="text-red-500" @click="disLike" />
        <button-circle v-else @click="like">
          <mdi-heart-outline />
        </button-circle>
      </template>
    </promised>

    <promised :promise="promiseLike">
      <template #pending>
        <spin-loader />
      </template>
      <template #default="likeCount">
        <span>{{ likeCount ? likeCount : 0 }}</span>
      </template>
      <template #rejected>
        <mdi-help />
      </template>
    </promised>
  </span>
</template>

<script lang="ts">
  import { articleDoc, articleLikedUserDoc, userDoc, userLikedArticleDoc } from '@/utils/firestore-reference'
  import { defineComponent, useContext, ref } from 'nuxt-composition-api'
  import { Promised } from 'vue-promised'

  const useFavarite = () => {
    const ctx = useContext()
    const existDoc = async (): Promise<boolean> => {
      const { exists } = await userLikedArticleDoc(ctx).get()
      return exists
    }

    const getCount = async (): Promise<number> => {
      const result = await articleDoc(ctx).get()
      const article = result.data()
      if (article) {
        return article.like
      } else {
        throw new Error('Fatal error')
      }
    }

    const disLike = async (): Promise<void> => {
      await articleLikedUserDoc(ctx).delete()
      promiseIsLike.value = Promise.resolve(false)
      promiseLike.value = Promise.resolve((await promiseLike.value) - 1)
    }

    const like = async (): Promise<void> => {
      await articleLikedUserDoc(ctx).set({
        userRef: userDoc(ctx)
      })
      promiseIsLike.value = Promise.resolve(true)
      promiseLike.value = Promise.resolve((await promiseLike.value) + 1)
    }

    const promiseIsLike = ref<Promise<boolean>>(existDoc())
    const promiseLike = ref<Promise<number>>(getCount())

    return { promiseIsLike, promiseLike, like, disLike }
  }

  export default defineComponent({
    components: {
      Promised
    },

    setup() {
      return useFavarite()
    }
  })
</script>
