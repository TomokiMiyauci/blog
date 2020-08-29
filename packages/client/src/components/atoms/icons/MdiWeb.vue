<template>
  <lazy-base-svg v-bind="$attrs">
    <path :d="mdiWeb" />
  </lazy-base-svg>
</template>

<script lang="ts">
  import { mdiWeb } from '@mdi/js'
  import { defineComponent } from 'nuxt-composition-api'

  export default defineComponent({
    setup() {
      return { mdiWeb }
    }
  })
</script>
