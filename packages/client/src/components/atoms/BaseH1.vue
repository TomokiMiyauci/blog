<template>
  <h1 class="xl:text-10xl text-4xl sm:text-5xl md:text-6xl lg:text-8xl mb-4 leading-none dark:text-white text-gray-800">
    {{ text }}
  </h1>
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
