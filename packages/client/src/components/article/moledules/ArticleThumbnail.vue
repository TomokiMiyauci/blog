<template>
  <div class="container mx-auto">
    <img
      loading="lazy"
      :alt="alt"
      width="1600"
      class="rounded-md shadow-md transition-shadow duration-300 hover:shadow-xl"
      :src="thumbnail"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api'
  export default defineComponent({
    props: {
      thumbnail: {
        type: String,
        default: ''
      },

      alt: {
        type: String,
        default: 'thumbnail'
      }
    }
  })
</script>
