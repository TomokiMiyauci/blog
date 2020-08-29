<template>
  <div class="relative">
    <lazy-app-bar />
    <main class="pt-16 lg:pt-24 transition-colors duration-300 ease-linear">
      <div class="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 pt-12 pb-20 flex flex-col items-center">
        <lazy-sub-logo />
      </div>
      <div class="block max-w-screen-xl mx-auto">
        <Nuxt />
      </div>
    </main>
    <lazy-the-footer class="mt-64" />
    <portal-target class="fixed" style="top: 50%; left: 50%; transform: translate(-50%, -50%)" name="center" />
    <portal-target class="fixed rigth-0 bottom-0 mb-5 ml-5" name="notice" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'nuxt-composition-api'
  export default defineComponent({})
</script>
