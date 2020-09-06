<template>
  <base-svg>
    <path :d="mdiSlashForward" />
  </base-svg>
</template>

<script lang="ts">
  import { mdiSlashForward } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiSlashForward }
    }
  })
</script>
