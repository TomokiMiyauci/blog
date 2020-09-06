<template>
  <base-svg v-bind="$attrs">
    <path :d="mdiWeatherNight" />
  </base-svg>
</template>

<script lang="ts">
  import { mdiWeatherNight } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiWeatherNight }
    }
  })
</script>
