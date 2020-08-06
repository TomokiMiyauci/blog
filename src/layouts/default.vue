<template>
  <div>
    <app-bar />
    <main class="pt-16 lg:pt-24 transition-colors duration-300 ease-linear">
      <div class="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 pt-12 pb-20 flex flex-col items-center">
        <h1 class="font-extrabold text-5xl leading-10 text-teal-900"><span>T</span>echsrc</h1>
        <h2 class="mt-4 sm:mt-5 font-light text-2xl text-center leading-tight text-gray-900">
          Blog for Enginner
        </h2>
      </div>
      <div class="block max-w-screen-xl mx-auto">
        <Nuxt />
      </div>
    </main>
  </div>
</template>

<script>
  export default {}
</script>
