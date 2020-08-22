<template>
  <base-button
    class="p-3 focus:outline-none rounded-full items-center hover:bg-gray-100 dark-hover:bg-gray-900 transition duration-500 justify-center inline-flex disabled:cursor-not-allowed disabled:text-gray-500 disabled:bg-transparent"
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
