<template>
  <lazy-base-svg v-bind="$attrs">
    <path :d="mdiInformation" />
  </lazy-base-svg>
</template>

<script lang="ts">
  import { mdiInformation } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiInformation }
    }
  })
</script>
