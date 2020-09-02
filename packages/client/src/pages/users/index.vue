<template>
  <div></div>
</template>

<script lang="ts">
  import { user } from '@/store'
  import { defineComponent } from '@nuxtjs/composition-api'
  export default defineComponent({
    setup(_, { root }) {
      root.$router.push(user.id)
    }
  })
</script>
