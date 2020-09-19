<template>
  <div class="relative">
    <app-bar />
    <main class="pt-16 lg:pt-24 transition-colors duration-300 ease-linear">
      <div class="block max-w-screen-xl mx-auto">
        <Nuxt />
      </div>
    </main>
    <app-footer class="mt-64 mb-56px md:mb-0" />
    <app-bottom-navigation class="md:hidden" />
    <portal-target class="fixed" style="top: 50%; left: 50%; transform: translate(-50%, -50%)" name="center" />
    <portal-target class="fixed rigth-0 bottom-0 mb-5 ml-5" name="notice" />
    <portal-target class="fixed right-0 mb-6 mr-6 bottom-0" name="bottom-right" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api'
  export default defineComponent({})
</script>
