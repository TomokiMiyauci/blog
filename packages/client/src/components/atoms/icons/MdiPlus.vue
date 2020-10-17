<template>
  <base-svg v-bind="$attrs">
    <path :d="mdiPlus" />
  </base-svg>
</template>

<script lang="ts">
  import { mdiPlus } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiPlus }
    }
  })
</script>
