<template>
  <lazy-base-svg v-bind="$attrs">
    <path :d="mdiHeartOutline" />
  </lazy-base-svg>
</template>

<script lang="ts">
  import { mdiHeartOutline } from '@mdi/js'
  import { defineComponent } from 'nuxt-composition-api'

  export default defineComponent({
    setup() {
      return { mdiHeartOutline }
    }
  })
</script>
