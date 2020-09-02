<template>
  <div>
    <h2><lazy-mdi-tag-multiple class="mr-1 text-green-700" />Tags</h2>
    <lazy-tag-nuxtjs />
    <lazy-tag-storybook />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api'
  export default defineComponent({
    props: {
      tags: {
        type: Array,
        default: () => []
      }
    }
  })
</script>
