<template>
  <div>
    <h2><mdi-tag-multiple class="mr-1 text-green-700" />Tags</h2>
    <tag-nuxtjs />
    <tag-storybook />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'nuxt-composition-api'
  export default defineComponent({
    props: {
      tags: {
        type: Array,
        default: () => []
      }
    }
  })
</script>
