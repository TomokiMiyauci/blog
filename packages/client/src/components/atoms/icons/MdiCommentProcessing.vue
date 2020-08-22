<template>
  <lazy-base-svg v-bind="$attrs">
    <path :d="mdiCommentProcessing" />
  </lazy-base-svg>
</template>

<script lang="ts">
  import { mdiCommentProcessing } from '@mdi/js'
  import { defineComponent } from 'nuxt-composition-api'

  export default defineComponent({
    setup() {
      return { mdiCommentProcessing }
    }
  })
</script>
