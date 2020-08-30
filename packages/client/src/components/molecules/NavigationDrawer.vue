<template>
  <div class="absolute px-3 flex items-center inset-0 bg-white dark:bg-gray-800 md:hidden">
    <lazy-lang-switcher />
    <lazy-button-color-mode />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'nuxt-composition-api'
  export default defineComponent({})
</script>
