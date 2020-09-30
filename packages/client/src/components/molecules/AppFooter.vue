<template>
  <footer class="py-4 flex flex-col justify-center items-center bg-gray-300 dark:bg-gray-900">
    <a :href="REPOSITORY_URL" target="_brank" class="hover:text-green-500 transition-colors duration-300"
      ><mdi-github height="48" width="48"
    /></a>
    <span v-text="`©${year} ${name || $config.PROJECT_NAME}`" />
  </footer>
</template>

<script lang="ts">
  import MdiGithub from '@/components/atoms/icons/MdiGithub.vue'
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

    components: {
      MdiGithub
    },

    setup() {
      return { REPOSITORY_URL }
    }
  })
</script>
