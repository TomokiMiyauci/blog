<template>
  <div>
    <h2>Tags</h2>
    <base-tag v-for="tag in tags" :key="tag" :name="tag" />
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
