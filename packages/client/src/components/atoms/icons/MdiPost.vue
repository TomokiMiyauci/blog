<template>
  <base-svg v-bind="$attrs">
    <path :d="mdiPost" />
  </base-svg>
</template>

<script lang="ts">
  import { mdiPost } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiPost }
    }
  })
</script>
