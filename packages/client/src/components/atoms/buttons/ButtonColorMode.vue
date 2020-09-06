<template>
  <button-circle @click="onClick">
    <transition name="fade-right" mode="out-in">
      <component :is="component" />
    </transition>
  </button-circle>
</template>

<script lang="ts">
  import { defineComponent, computed } from '@nuxtjs/composition-api'
  import Vue from 'vue'
  declare module 'vue/types/vue' {
    interface ColorMode extends Vue {
      value: Mode
      preference: Mode
      unknown: string
    }
    interface Vue {
      $colorMode: ColorMode
    }
  }

  type Mode = 'light' | 'dark'
  export default defineComponent({
    components: {
      MdiWeatherSunny: () => import('@/components/atoms/icons/MdiWeatherSunny.vue'),
      MdiWeatherNight: () => import('@/components/atoms/icons/MdiWeatherNight.vue')
    },
    setup(_, { root }) {
      const onClick = (): void => {
        root.$colorMode.value === 'light'
          ? (root.$colorMode.preference = 'dark')
          : (root.$colorMode.preference = 'light')
      }
      const component = computed(() => (root.$colorMode.value === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'))

      return { component, onClick }
    }
  })
</script>
