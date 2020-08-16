<template>
  <base-svg v-bind="$attrs">
    <path :d="mdiCloseCircle" />
  </base-svg>
</template>

<script lang="ts">
  import { mdiCloseCircle } from '@mdi/js'
  import { defineComponent } from 'nuxt-composition-api'

  export default defineComponent({
    setup() {
      return { mdiCloseCircle }
    }
  })
</script>
