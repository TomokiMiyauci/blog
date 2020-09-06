<template>
  <base-svg v-bind="$attrs">
    <path :d="mdiAlertOctagram" />
  </base-svg>
</template>

<script lang="ts">
  import { mdiAlertOctagram } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiAlertOctagram }
    }
  })
</script>
