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
  import { user } from '@/store'
  import { defineComponent, useContext, ref, onBeforeMount } from 'nuxt-composition-api'
  import { Promised } from 'vue-promised'

  const useFavarite = () => {
    const { $db, params } = useContext()

    const existDoc = async (): Promise<boolean> => {
      const articleDoc = $db.ref('articles').child(params.value.slug)
      const likedUserDoc = articleDoc.child('likedUsers').child(user.id)
      const doc = await likedUserDoc.get().catch(() => false)

      return Boolean(doc)
    }

    const getCount = async (): Promise<number> => {
      const articleDoc = $db.ref('articles').child(params.value.slug)

      const result = await articleDoc.get()
      return result.like as number
    }

    const disLike = async (): Promise<void> => {
      await $db.ref('articles').child(params.value.slug).child('likedUsers').child(user.id).delete({ exists: true })

      promiseIsLike.value = Promise.resolve(false)
      promiseLike.value = Promise.resolve(((await promiseLike.value) || 0) - 1)
    }

    const like = async (): Promise<void> => {
      await $db
        .ref('articles')
        .child(params.value.slug)
        .child('likedUsers')
        .child(user.id)
        .set({
          userRef: $db.ref('users').child(user.id)
        })

      promiseIsLike.value = Promise.resolve(true)
      promiseLike.value = Promise.resolve(((await promiseLike.value) || 0) + 1)
    }

    onBeforeMount(() => {
      promiseIsLike.value = existDoc()
      promiseLike.value = getCount()
    })

    const promiseIsLike = ref<Promise<boolean>>()
    const promiseLike = ref<Promise<number>>()

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
