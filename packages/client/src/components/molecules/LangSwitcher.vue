<template>
  <div class="relative">
    <button-circle @click.stop="isShow = !isShow">
      <mdi-translate />
    </button-circle>
    <transition name="fade-down">
      <ul
        v-if="isShow"
        v-outside-click="() => (isShow = false)"
        class="absolute mt-1 px-3 py-1 left-0 rounded shadow-md bg-white dark:bg-gray-600 hover:shadow-2xl transition-shadow duration-300"
      >
        <nuxt-link
          class="cursor-pointer px-2 py-1 flex rounded items-center hover:bg-green-500 hover:shadow-xl transition duration-300"
          tag="li"
          :to="switchLocalePath('ja')"
          @click.native.prevent="isShow = false"
          ><flag-for-japan class="text-red-500" height="36" /><span class="ml-1">{{ $t('japanese') }}</span></nuxt-link
        >
        <nuxt-link
          class="cursor-pointer px-2 py-1 flex rounded items-center hover:bg-green-500 transition duration-300"
          tag="li"
          :to="switchLocalePath('en')"
          @click.native.prevent="isShow = false"
        >
          <mdi-web class="inline-flex items-center justify-center bg-gray-700 rounded-full" width="36" height="36" />

          <span class="ml-1">{{ $t('english') }}</span></nuxt-link
        >
      </ul>
    </transition>
  </div>
</template>

<script lang="ts">
  import ButtonCircle from '@/components/atoms/buttons/ButtonCircle.vue'
  import MdiTranslate from '@/components/atoms/icons/MdiTranslate.vue'
  import MdiWeb from '@/components/atoms/icons/MdiWeb.vue'
  import outsideClick from '@/directives/outside-click'
  import { defineComponent, ref } from '@nuxtjs/composition-api'
  export default defineComponent({
    setup() {
      const isShow = ref(false)
      return { isShow }
    },

    components: {
      ButtonCircle,
      MdiTranslate,
      MdiWeb
    },

    directives: {
      outsideClick
    }
  })
</script>

<i18n lang="yml">
en:
  japanese: 日本語
  english: English
ja:
  japanese: 日本語
  english: English
</i18n>
