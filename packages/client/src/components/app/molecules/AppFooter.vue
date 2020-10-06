<template>
  <footer class="text-gray-500 bg-gray-300 dark:bg-gray-900">
    <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
      <logo />
      <div class="sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4 text-gray-600">
        <user-credit />

        <div class="text-center sm:text-left">
          <project-credit />
        </div>
      </div>

      <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
        <a :href="REPOSITORY_URL" target="_brank" class="hover:text-green-500 transition-colors duration-300"
          ><mdi-github height="48" width="48"
        /></a>
      </span>
    </div>
  </footer>
</template>

<script lang="ts">
  import ProjectCredit from '@/components/app/atoms/ProjectCredit.vue'
  import UserCredit from '@/components/app/atoms/UserCredit.vue'
  import MdiGithub from '@/components/atoms/icons/MdiGithub.vue'
  import Logo from '@/components/atoms/logos/Logo.vue'
  import { REPOSITORY_URL } from '@/utils/constants'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      MdiGithub,
      UserCredit,
      ProjectCredit,
      Logo
    },

    setup() {
      return { REPOSITORY_URL }
    }
  })
</script>
