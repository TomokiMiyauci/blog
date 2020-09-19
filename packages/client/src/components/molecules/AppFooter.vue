<template>
  <footer class="py-4 flex flex-col justify-center items-center bg-gray-300 dark:bg-gray-900">
    <a :href="REPOSITORY_URL" target="_brank" class="hover:text-green-500 transition-colors duration-300"
      ><mdi-github height="48" width="48"
    /></a>
    <span>©{{ year }} {{ name || $config.PROJECT_NAME }}</span>
  </footer>
</template>

<script lang="ts">
  import { REPOSITORY_URL } from '@/utils/constants'
  import { defineComponent } from '@nuxtjs/composition-api'
  export default defineComponent({
    props: {
      year: {
        type: Number,
        default: new Date().getFullYear()
      },

      name: {
        type: String,
        default: ''
      }
    },

    setup(_, { root }) {
      return { REPOSITORY_URL }
    }
  })
</script>
