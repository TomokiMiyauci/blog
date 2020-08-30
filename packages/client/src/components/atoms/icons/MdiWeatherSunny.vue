<template>
  <lazy-base-svg v-bind="$attrs">
    <path :d="mdiWeatherSunny" />
  </lazy-base-svg>
</template>

<script lang="ts">
  import { mdiWeatherSunny } from '@mdi/js'
  import { defineComponent } from 'nuxt-composition-api'

  export default defineComponent({
    setup() {
      return { mdiWeatherSunny }
    }
  })
</script>
