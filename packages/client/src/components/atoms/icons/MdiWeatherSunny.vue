<template>
  <base-svg v-bind="$attrs">
    <path :d="mdiWeatherSunny" />
  </base-svg>
</template>

<script lang="ts">
  import { mdiWeatherSunny } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiWeatherSunny }
    }
  })
</script>
