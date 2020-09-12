<template>
  <base-svg v-bind="$attrs">
    <path :d="mdiClipboardCheck" />
  </base-svg>
</template>

<script lang="ts">
  import { mdiClipboardCheck } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiClipboardCheck }
    }
  })
</script>
