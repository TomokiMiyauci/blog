<template>
  <nuxt-link
    class="cursor-pointer px-2 py-1 flex rounded items-center bg-gradient-to-r hover:from-teal-300 hover:to-green-500 dark-hover:bg-green-600 transition-all duration-300"
    v-bind="$attrs"
    :to="switchLocalePath('ja')"
    active-class="bg-gradient-to-r from-red-400 to-orange-200"
    exact
    replace
  >
    <flag-for-japan height="36" /><span class="ml-1">{{ $t('japanese') }}</span>
  </nuxt-link>
</template>

<script lang="ts">
  import FlagForJapan from '@/components/atoms/icons/FlagForJapan.vue'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      FlagForJapan
    }
  })
</script>

<i18n lang="yml">
en:
  japanese: 日本語

ja:
  japanese: 日本語
</i18n>
