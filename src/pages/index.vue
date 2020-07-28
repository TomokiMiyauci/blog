<template>
  <div class="container flex flex-start">
    <nuxt-content :document="page" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'nuxt-composition-api'
  export default defineComponent({
    async asyncData({ $content }) {
      const page = await $content('h').fetch()

      return { page }
    }
  })
</script>
