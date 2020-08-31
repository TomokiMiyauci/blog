<template>
  <lazy-base-svg v-bind="$attrs">
    <path :d="mdiCommentTextMultiple" />
  </lazy-base-svg>
</template>

<script lang="ts">
  import { mdiCommentTextMultiple } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiCommentTextMultiple }
    }
  })
</script>
