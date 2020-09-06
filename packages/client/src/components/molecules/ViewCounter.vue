<template>
  <span>
    <mdi-eye class="mr-2" />
    <promised :promise="promiseViewCount">
      <template #pending>
        <spin-loader />
      </template>
      <template #default="like">
        <span>{{ like ? like : 0 }}</span>
      </template>
      <template #rejected>
        <mdi-help />
      </template>
    </promised>
  </span>
</template>

<script lang="ts">
  import { articleDoc, viewedUserDoc, userDoc } from '@/utils/firestore-reference'
  import { defineComponent, ref, useContext, onBeforeMount } from '@nuxtjs/composition-api'
  import { Promised } from 'vue-promised'

  const useViewCounter = () => {
    const ctx = useContext()
    const promiseViewCount = ref<Promise<number>>()

    const viewCount = async () => {
      const result = await articleDoc(ctx).get()
      const data = result.data()

      if (!data) throw new Error('Data are not exist')

      return data.view
    }

    const view = (): void => {
      const doc = viewedUserDoc(ctx)
      if (!doc) return
      doc
        .set({
          userRef: userDoc(ctx)
        })
        .catch(() => {})
    }

    onBeforeMount(() => view())
    promiseViewCount.value = viewCount()

    return { promiseViewCount }
  }

  export default defineComponent({
    components: {
      Promised
    },

    setup() {
      return useViewCounter()
    }
  })
</script>
