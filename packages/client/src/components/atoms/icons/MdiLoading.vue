<template>
  <lazy-base-svg v-bind="$attrs">
    <path :d="mdiLoading" />
  </lazy-base-svg>
</template>

<script lang="ts">
  import { mdiLoading } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiLoading }
    }
  })
</script>
