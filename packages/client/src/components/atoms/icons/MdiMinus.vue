<template>
  <base-svg v-bind="$attrs">
    <path :d="mdiMinus" />
  </base-svg>
</template>

<script lang="ts">
  import { mdiMinus } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiMinus }
    }
  })
</script>
