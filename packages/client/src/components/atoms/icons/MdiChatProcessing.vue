<template>
  <base-svg>
    <path :d="mdiChatProcessing" />
  </base-svg>
</template>

<script lang="ts">
  import { mdiChatProcessing } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiChatProcessing }
    }
  })
</script>
