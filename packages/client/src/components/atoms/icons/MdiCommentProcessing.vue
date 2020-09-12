<template>
  <base-svg v-bind="$attrs">
    <path :d="mdiCommentProcessing" />
  </base-svg>
</template>

<script lang="ts">
  import { mdiCommentProcessing } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiCommentProcessing }
    }
  })
</script>
