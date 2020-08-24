<template>
  <lazy-base-svg v-bind="$attrs">
    <path :d="mdiAlertOctagram" />
  </lazy-base-svg>
</template>

<script lang="ts">
  import { mdiAlertOctagram } from '@mdi/js'
  import { defineComponent } from 'nuxt-composition-api'

  export default defineComponent({
    setup() {
      return { mdiAlertOctagram }
    }
  })
</script>
