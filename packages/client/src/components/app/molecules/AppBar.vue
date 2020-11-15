<template>
  <header
    class="fixed top-0 bg-white dark:bg-gray-800 left-0 right-0 z-30 bg-light-elevatedSurface dark:bg-dark-elevatedSurface border-b border-light-border dark:border-dark-border lg:border-0 h-16 lg:h-24 transition-colors duration-300 ease-linear"
  >
    <div class="container relative h-full flex items-center justify-between mx-auto px-4 lg:py-6">
      <nuxt-link class="font-mono inline-flex items-end" :to="localePath('/')">
        <logo />
      </nuxt-link>
      <div class="flex items-center">
        <fulltext-search />
        <lang-switcher class="hidden ml-2 lg:block" />
        <button-color-mode class="ml-2 hidden md:inline-block" />
        <button-circle class="md:hidden" :class="{ 'z-10': isActive }" @click="isActive = !isActive">
          <hamburger-close :active="isActive" />
        </button-circle>
        <transition name="fade-right">
          <app-navigation-drawer v-show="isActive" />
        </transition>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
  import AppNavigationDrawer from '@/components/app/molecules/AppNavigationDrawer.vue'
  import ButtonCircle from '@/components/atoms/buttons/ButtonCircle.vue'
  import HamburgerClose from '@/components/atoms/icons/HamburgerClose.vue'
  import Logo from '@/components/atoms/logos/Logo.vue'
  import LogoText from '@/components/atoms/logos/LogoText.vue'
  import LangSwitcher from '@/components/lang-switcher/molecules/LangSwitcher.vue'
  import FulltextSearch from '@/components/searcher/molecules/FulltextSearch.vue'
  import { defineComponent, ref } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      ButtonCircle,
      FulltextSearch,
      LogoText,
      Logo,
      LangSwitcher,
      HamburgerClose,
      AppNavigationDrawer
    },

    setup() {
      const isActive = ref(false)
      return { isActive }
    }
  })
</script>
