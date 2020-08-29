<template>
  <header
    class="fixed top-0 bg-white dark:bg-gray-800 left-0 right-0 z-30 bg-light-elevatedSurface dark:bg-dark-elevatedSurface border-b border-light-border dark:border-dark-border lg:border-0 h-16 lg:h-24 transition-colors duration-300 ease-linear"
  >
    <div class="container relative h-full flex items-center justify-between mx-auto px-4 lg:py-6">
      <nuxt-link class="font-mono inline-flex items-end" :to="localePath('/')">
        <img width="56px" src="/icon.png" alt="logo" />
        <span class="ml-2 text-3xl leading-none tracking-tighter lg:text-4xl text-teal-900 dark:text-white"
          ><span style="color: #72deaf">T</span>ech<span style="color: #72deaf">s</span>rc</span
        ></nuxt-link
      >
      <div class="flex items-center">
        <lazy-fulltext-search />
        <lazy-button-color-mode class="ml-5 hidden md:inline-block" />
        <lazy-lang-switcher class="hidden lg:block" />
        <lazy-button-circle class="md:hidden" :class="{ 'z-10': isActive }" @click="isActive = !isActive">
          <lazy-hamburger-close :active="isActive" />
        </lazy-button-circle>
        <transition name="fade-right">
          <lazy-navigation-drawer v-show="isActive" />
        </transition>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'nuxt-composition-api'

  export default defineComponent({
    setup() {
      const isActive = ref(false)
      return { isActive }
    }
  })
</script>
