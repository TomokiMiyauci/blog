<template>
  <footer class="relative px-2 sm:px-10 py-10 flex justify-end bg-gray-300 dark:bg-gray-900">
    <a
      :href="REPOSITORY_URL"
      target="_brank"
      class="absolute hover:text-green-400 transition-colors duration-300"
      style="top: 50%; left: 50%; transform: translate(-50%, -50%)"
      ><mdi-github height="48" width="48"
    /></a>
    <span>©{{ new Date().getFullYear() }} {{ PROJECT_NAME }}</span>
  </footer>
</template>

<script lang="ts">
  import { REPOSITORY_URL } from '@/utils/constants'
  import { defineComponent } from 'nuxt-composition-api'
  export default defineComponent({
    setup(_, { root }) {
      return { REPOSITORY_URL, PROJECT_NAME: root.$config.PROJECT_NAME }
    }
  })
</script>
