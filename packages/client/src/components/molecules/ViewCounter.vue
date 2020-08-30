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
  import { defineComponent, onBeforeMount, ref, useContext } from 'nuxt-composition-api'
  import { Promised } from 'vue-promised'

  const useViewCounter = () => {
    const { $db, route } = useContext()
    const promiseViewCount = ref()

    onBeforeMount(() => {
      promiseViewCount.value = $db.ref(`articles/${route.value.params.slug}`).get()
    })

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
