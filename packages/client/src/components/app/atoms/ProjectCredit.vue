<template>
  <span class="text-sm text-gray-600" v-text="`©${year} ${name || $config.PROJECT_NAME}`" />
</template>

<script lang="ts">
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
    }
  })
</script>
