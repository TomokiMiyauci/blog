<template>
  <button-circle @click="onClick">
    <transition name="fade-right" mode="out-in">
      <component :is="component" />
    </transition>
  </button-circle>
</template>

<script lang="ts">
  import ButtonCircle from '@/components/atoms/buttons/ButtonCircle.vue'
  import MdiWeatherNight from '@/components/atoms/icons/MdiWeatherNight.vue'
  import MdiWeatherSunny from '@/components/atoms/icons/MdiWeatherSunny.vue'
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
      ButtonCircle,
      MdiWeatherSunny,
      MdiWeatherNight
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
