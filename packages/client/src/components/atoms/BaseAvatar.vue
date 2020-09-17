<template>
  <img :src="src" :alt="alt" :width="width" :height="height" />
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    props: {
      src: {
        type: String,
        required: true
      },

      alt: {
        type: String,
        required: true
      },

      width: {
        type: Number,
        default: 48
      },

      height: {
        type: Number,
        default: 48
      }
    }
  })
</script>
