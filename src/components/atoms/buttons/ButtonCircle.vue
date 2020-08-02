<template>
  <base-button class="p-3 focus:outline-none rounded-full bg-gray-300 items-center justify-center inline-flex">
    <slot />
  </base-button>
</template>

<script lang="ts">
  import { defineComponent } from 'nuxt-composition-api'
  export default defineComponent({})
</script>
