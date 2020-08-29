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
  import { defineComponent, onBeforeMount, ref } from 'nuxt-composition-api'
  import { Promised } from 'vue-promised'

  export default defineComponent({
    components: {
      Promised
    },

    setup(_, { root }) {
      const promiseViewCount = ref()
      onBeforeMount(() => {
        promiseViewCount.value = root.$db.ref(`articles/${root.$route.params.slug}`).get()
      })

      return { promiseViewCount }
    }
  })
</script>
