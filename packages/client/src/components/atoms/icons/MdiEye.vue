<template>
  <lazy-base-svg v-bind="$attrs">
    <path :d="mdiEye" />
  </lazy-base-svg>
</template>

<script lang="ts">
  import { mdiEye } from '@mdi/js'
  import { defineComponent } from 'nuxt-composition-api'

  export default defineComponent({
    setup() {
      return { mdiEye }
    }
  })
</script>
