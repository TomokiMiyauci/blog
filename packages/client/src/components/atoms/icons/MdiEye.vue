<template>
  <base-svg v-bind="$attrs">
    <path :d="mdiEye" />
  </base-svg>
</template>

<script lang="ts">
  import { mdiEye } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiEye }
    }
  })
</script>
