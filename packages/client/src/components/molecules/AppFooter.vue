<template>
  <footer class="text-gray-500 bg-gray-300 dark:bg-gray-900">
    <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
      <div class="font-mono inline-flex items-end">
        <img width="56px" src="/icon.png" alt="logo" />
        <span class="ml-2 text-3xl leading-none tracking-tighter lg:text-4xl text-teal-900 dark:text-white"
          ><span style="color: #72deaf">{{ t }}</span
          >{{ ech }}<span style="color: #72deaf">{{ s }}</span
          >{{ rc }}</span
        >
      </div>
      <span
        class="text-sm text-gray-600 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4"
        v-text="`©${year} ${name || $config.PROJECT_NAME}`"
      />
      <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
        <a :href="REPOSITORY_URL" target="_brank" class="hover:text-green-500 transition-colors duration-300"
          ><mdi-github height="48" width="48"
        /></a>
      </span>
    </div>
  </footer>
</template>

<script lang="ts">
  import MdiGithub from '@/components/atoms/icons/MdiGithub.vue'
  import { REPOSITORY_URL } from '@/utils/constants'
  import { defineComponent } from '@nuxtjs/composition-api'

  const t = 'T'
  const ech = 'ech'
  const s = 's'
  const rc = 'rc'

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
      return { REPOSITORY_URL, t, ech, s, rc }
    }
  })
</script>
