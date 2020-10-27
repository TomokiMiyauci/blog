<template>
  <div class="relative">
    <app-bar />
    <main class="pt-16 lg:pt-24 transition-colors duration-300 ease-linear">
      <div class="block mx-auto">
        <nuxt />
      </div>
    </main>
    <app-footer :class="{ hidden: $route.path.startsWith('/chat') }" class="mt-64 mb-56px md:mb-0" />
    <app-bottom-navigation class="md:hidden" />
    <notice class="fixed left-6 bottom-16" />

    <portal-target class="fixed" style="top: 50%; left: 50%; transform: translate(-50%, -50%)" name="center" />
    <portal-target class="fixed rigth-0 bottom-0 mb-5 ml-5" name="notice" />
    <portal-target class="fixed right-6 bottom-6" name="bottom-right" />
  </div>
</template>

<script lang="ts">
  import AppBar from '@/components/app/molecules/AppBar.vue'
  import AppBottomNavigation from '@/components/app/molecules/AppBottomNavigation.vue'
  import AppFooter from '@/components/app/molecules/AppFooter.vue'
  import Notice from '@/components/notice/molecules/Notice.vue'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      AppFooter,
      AppBar,
      AppBottomNavigation,
      Notice
    },

    head() {
      return this.$nuxtI18nSeo()
    }
  })
</script>
