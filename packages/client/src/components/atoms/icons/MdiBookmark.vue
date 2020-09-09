<template>
  <base-svg v-bind="$attrs">
    <path :d="mdiBookmark" />
  </base-svg>
</template>

<script lang="ts">
  import { mdiBookmark } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiBookmark }
    }
  })
</script>
