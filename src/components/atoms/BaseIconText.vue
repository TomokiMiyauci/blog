<template>
  <span>
    <slot />
    <span class="ml-1">{{ text }}</span>
  </span>
</template>

<script lang="ts">
  import { defineComponent } from 'nuxt-composition-api'
  export default defineComponent({
    props: {
      text: {
        type: [String, Number],
        default: ''
      }
    }
  })
</script>
