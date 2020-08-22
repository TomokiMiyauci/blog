<template>
  <div>
    <app-bar />
    <main class="pt-16 lg:pt-24 transition-colors duration-300 ease-linear">
      <div class="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 pt-12 pb-20 flex flex-col items-center">
        <sub-logo />
      </div>
      <div class="block max-w-screen-xl mx-auto">
        <Nuxt />
      </div>
    </main>
    <the-footer class="mt-64" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'nuxt-composition-api'
  export default defineComponent({})
</script>
