<template>
  <h1 class="text-4xl mb-4 leading-tight dark:text-white text-gray-800">{{ text }}</h1>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api'
  export default defineComponent({
    props: {
      text: {
        type: String,
        default: ''
      }
    }
  })
</script>
