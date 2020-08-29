<template>
  <lazy-base-svg v-bind="$attrs">
    <path :d="mdiClipboardText" />
  </lazy-base-svg>
</template>

<script lang="ts">
  import { mdiClipboardText } from '@mdi/js'
  import { defineComponent } from 'nuxt-composition-api'

  export default defineComponent({
    setup() {
      return { mdiClipboardText }
    }
  })
</script>
