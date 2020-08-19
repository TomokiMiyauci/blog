<template>
  <base-svg v-bind="$attrs">
    <path :d="mdiLoading" />
  </base-svg>
</template>

<script lang="ts">
  import { mdiLoading } from '@mdi/js'
  import { defineComponent } from 'nuxt-composition-api'

  export default defineComponent({
    setup() {
      return { mdiLoading }
    }
  })
</script>
