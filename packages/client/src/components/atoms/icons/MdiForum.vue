<template>
  <base-svg v-bind="$attrs">
    <path :d="mdiForum" />
  </base-svg>
</template>

<script lang="ts">
  import { mdiForum } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiForum }
    }
  })
</script>
