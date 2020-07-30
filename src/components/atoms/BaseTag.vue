<template>
  <nuxt-link class="px-4 py-1 rounded m-2 cursor-pointer inline-block border" tag="span" :to="`tags/${name}`">{{
    name
  }}</nuxt-link>
</template>

<script lang="ts">
  import { defineComponent } from 'nuxt-composition-api'
  export default defineComponent({
    props: {
      name: {
        type: String,
        default: ''
      }
    }
  })
</script>
