<template>
  <div class="container flex flex-start">
    <nuxt-content :document="page" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    async asyncData({ $content }) {
      const page = await $content('h').fetch()

      return { page }
    }
  })
</script>
