<template>
  <lazy-base-svg v-bind="$attrs">
    <path :d="mdiCalendarEdit" />
  </lazy-base-svg>
</template>

<script lang="ts">
  import { mdiCalendarEdit } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiCalendarEdit }
    }
  })
</script>
