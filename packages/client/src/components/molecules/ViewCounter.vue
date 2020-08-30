<template>
  <div>
    <lazy-mdi-eye class="mr-2" />
    <promised :promise="promiseViewCount">
      <template #pending>
        <spin-loader />
      </template>
      <template #default="{ like }">
        <span>{{ like ? like : 0 }}</span>
      </template>
      <template #rejected>
        <mdi-help />
      </template>
    </promised>
  </div>
</template>

<script lang="ts">
  import { articleDoc } from '@/utils/firestore-reference'
  import { defineComponent, ref, useContext } from 'nuxt-composition-api'
  import { Promised } from 'vue-promised'

  const useViewCounter = () => {
    const ctx = useContext()
    const promiseViewCount = ref<Promise<number>>()

    const viewCount = async () => {
      const result = await articleDoc(ctx).get()
      return result.data()!.view
    }

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
