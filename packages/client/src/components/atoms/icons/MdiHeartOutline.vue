<template>
  <base-svg v-bind="$attrs">
    <path :d="mdiHeartOutline" />
  </base-svg>
</template>

<script lang="ts">
  import { mdiHeartOutline } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiHeartOutline }
    }
  })
</script>
