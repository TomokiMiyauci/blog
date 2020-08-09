<template>
  <base-button
    class="p-3 focus:outline-none rounded-full items-center hover:bg-gray-100 dark-hover:bg-gray-900 transition duration-300 justify-center inline-flex"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </base-button>
</template>

<script lang="ts">
  import { defineComponent } from 'nuxt-composition-api'
  export default defineComponent({})
</script>
