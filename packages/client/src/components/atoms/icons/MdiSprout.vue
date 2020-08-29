<template>
  <lazy-base-svg v-bind="$attrs">
    <path :d="mdiSprout" />
  </lazy-base-svg>
</template>

<script lang="ts">
  import { mdiSprout } from '@mdi/js'
  import { defineComponent } from 'nuxt-composition-api'

  export default defineComponent({
    setup() {
      return { mdiSprout }
    }
  })
</script>
