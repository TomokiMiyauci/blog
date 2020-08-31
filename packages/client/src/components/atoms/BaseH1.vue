<template>
  <h1 class="font-mono text-4xl font-semibold mb-4 leading-tight">{{ text }}</h1>
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
