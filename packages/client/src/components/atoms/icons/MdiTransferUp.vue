<template>
  <base-svg v-bind="$attrs">
    <path :d="mdiTransferUp" />
  </base-svg>
</template>

<script lang="ts">
  import { mdiTransferUp } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiTransferUp }
    }
  })
</script>
