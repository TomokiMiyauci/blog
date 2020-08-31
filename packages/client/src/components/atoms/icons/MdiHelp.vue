<template>
  <lazy-base-svg v-bind="$attrs">
    <path :d="mdiHelp" />
  </lazy-base-svg>
</template>

<script lang="ts">
  import { mdiHelp } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiHelp }
    }
  })
</script>
