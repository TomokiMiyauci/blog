<template>
  <base-svg v-bind="$attrs">
    <path :d="mdiWeb" />
  </base-svg>
</template>

<script lang="ts">
  import { mdiWeb } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiWeb }
    }
  })
</script>
