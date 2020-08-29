<template>
  <div class="relative">
    <lazy-button-circle @click.stop="isShow = !isShow">
      <lazy-mdi-translate />
    </lazy-button-circle>
    <transition name="fade-down">
      <ul
        v-if="isShow"
        v-click-outside="() => (isShow = false)"
        class="absolute mt-1 px-3 py-1 left-0 rounded shadow-md bg-white dark:bg-gray-600 hover:shadow-2xl transition-shadow duration-300"
      >
        <nuxt-link
          class="cursor-pointer px-2 py-1 flex rounded items-center hover:bg-green-500 hover:shadow-xl transition duration-300"
          tag="li"
          :to="switchLocalePath('ja')"
          @click.native.prevent="isShow = false"
          ><lazy-flag-for-japan class="text-red-500" height="36" /><span class="ml-1">Japanese</span></nuxt-link
        >
        <nuxt-link
          class="cursor-pointer px-2 py-1 flex rounded items-center hover:bg-green-500 transition duration-300"
          tag="li"
          :to="switchLocalePath('en')"
          @click.native.prevent="isShow = false"
        >
          <lazy-mdi-web
            class="inline-flex items-center justify-center bg-gray-700 rounded-full"
            width="36"
            height="36"
          />

          <span class="ml-1">English</span></nuxt-link
        >
      </ul>
    </transition>
  </div>
</template>

<script lang="ts">
  import out from '@/directives/outside-click'
  import { defineComponent, ref } from 'nuxt-composition-api'
  export default defineComponent({
    setup() {
      const isShow = ref(false)
      return { isShow }
    },

    directives: {
      'click-outside': out
    }
  })
</script>
