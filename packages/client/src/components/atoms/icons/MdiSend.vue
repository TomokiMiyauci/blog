<template>
  <base-svg v-bind="$attrs">
    <path :d="mdiSend" />
  </base-svg>
</template>

<script lang="ts">
  import { mdiSend } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiSend }
    }
  })
</script>
