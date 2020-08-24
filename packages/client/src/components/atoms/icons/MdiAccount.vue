<template>
  <lazy-base-svg v-bind="$attrs">
    <path :d="mdiAccount" />
  </lazy-base-svg>
</template>

<script lang="ts">
  import { mdiAccount } from '@mdi/js'
  import { defineComponent } from 'nuxt-composition-api'

  export default defineComponent({
    setup() {
      return { mdiAccount }
    }
  })
</script>
