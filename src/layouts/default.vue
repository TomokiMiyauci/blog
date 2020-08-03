<template>
  <div>
    <app-bar />
    <main class="pt-16 lg:pt-24 transition-colors duration-300 ease-linear">
      <div class="block md:grid max-w-screen-xl mx-auto grid-temp">
        <Nuxt style="grid-column: 2 / 3;" />
        <tags-list style="grid-column: 3 / 3;" :tags="['hello', 'world', 'blog']" />
      </div>
    </main>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped>
  .grid-temp {
    grid-template-columns: 240px 1fr 240px;
    width: calc(100% - 50px);
  }
</style>
