<template>
  <div>
    <app-bar />
    <main
      class="pt-16 lg:pt-24 bg-light-elevatedSurface dark:bg-dark-elevatedSurface transition-colors duration-300 ease-linear"
    >
      <div class="container lg:max-w-4xl mx-auto p-4 pb-8">
        <Nuxt />
      </div>
    </main>
  </div>
</template>

<script>
  export default {}
</script>

<style>
  html {
    box-sizing: border-box;
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }
</style>

<style scoped>
  .header {
    align-content: center;
    justify-content: center;
    background-color: white;
    box-shadow: 0 1px;
  }
</style>
