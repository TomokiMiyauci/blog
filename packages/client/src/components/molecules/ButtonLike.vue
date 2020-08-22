<template>
  <div class="inline-flex items-center">
    <Promised :promise="promiseIsLike">
      <template #pending>
        <mdi-heart />
      </template>
      <template #default="isLike">
        <button-favorite v-if="!isLike" class="text-red-500" @click="like" />
        <button-circle v-else @click="disLike">
          <mdi-heart-outline />
        </button-circle>
      </template>
    </Promised>

    <promised :promise="promiseLike">
      <template #pending>
        ...
      </template>
      <template #default="likeCount">
        <span>{{ likeCount ? likeCount : '' }}</span>
      </template>
    </promised>
  </div>
</template>

<script lang="ts">
  import { articleDoc, articleLikedUserDoc, userDoc, userLikedArticleDoc } from '@/utils/firestore-reference'
  import { defineComponent, useContext, ref } from 'nuxt-composition-api'
  import { Promised } from 'vue-promised'

  const useFavarite = () => {
    const ctx = useContext()
    const existDoc = async (): Promise<Boolean> => {
      const { exists } = await userLikedArticleDoc(ctx).get()

      return exists
    }

    const getCount = async (): Promise<number> => {
      const result = await articleDoc(ctx).get()
      const article = result.data()
      if (article) {
        return article.like
      } else {
        throw new Error('e')
      }
    }

    const disLike = async (): Promise<void> => {
      await articleLikedUserDoc(ctx).delete()
      promiseIsLike.value = Promise.resolve(false)
      promiseLike.value = getCount()
    }

    const like = async (): Promise<void> => {
      await articleLikedUserDoc(ctx).set({
        userRef: userDoc(ctx)
      })
      promiseIsLike.value = Promise.resolve(true)
      promiseLike.value = getCount()
    }

    const promiseIsLike = ref(existDoc())
    const promiseLike = ref(getCount())

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
