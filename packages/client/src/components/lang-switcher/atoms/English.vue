<template>
  <nuxt-link
    class="cursor-pointer px-2 py-1 flex rounded items-center bg-gradient-to-r hover:from-teal-300 hover:to-green-500 dark-hover:bg-green-600 transition-all duration-300"
    v-bind="$attrs"
    :to="switchLocalePath('en')"
    active-class="bg-gradient-to-r from-red-400 to-orange-200"
    exact
    replace
  >
    <mdi-web width="36" height="36" /><span class="ml-1">{{ $t('english') }}</span>
  </nuxt-link>
</template>

<script lang="ts">
  import MdiWeb from '@/components/atoms/icons/MdiWeb.vue'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      MdiWeb
    }
  })
</script>

<i18n lang="yml">
en:
  english: English

ja:
  english: English
</i18n>
