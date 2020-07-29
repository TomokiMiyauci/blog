<template>
  <header
    class="fixed top-0 bg-white left-0 right-0 z-30 bg-light-elevatedSurface dark:bg-dark-elevatedSurface border-b border-light-border dark:border-dark-border lg:border-0 h-16 lg:h-24 transition-colors duration-300 ease-linear"
  >
    <div class="container relative h-full flex items-center justify-between mx-auto px-4 lg:py-6">
      <nuxt-link class="text-4xl font-mono" to="/">Techxas</nuxt-link>
      <input-search />
    </div>
  </header>
</template>

<script>
  export default {}
</script>
