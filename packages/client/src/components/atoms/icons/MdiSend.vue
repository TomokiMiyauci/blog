<template>
  <lazy-base-svg v-bind="$attrs">
    <path :d="mdiSend" />
  </lazy-base-svg>
</template>

<script lang="ts">
  import { mdiSend } from '@mdi/js'
  import { defineComponent } from 'nuxt-composition-api'

  export default defineComponent({
    setup() {
      return { mdiSend }
    }
  })
</script>
