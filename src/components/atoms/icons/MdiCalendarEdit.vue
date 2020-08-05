<template>
  <base-svg v-bind="$attrs">
    <path :d="mdiCalendarEdit" />
  </base-svg>
</template>

<script lang="ts">
  import { mdiCalendarEdit } from '@mdi/js'
  import { defineComponent } from 'nuxt-composition-api'

  export default defineComponent({
    setup() {
      return { mdiCalendarEdit }
    }
  })
</script>
