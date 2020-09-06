<template>
  <base-svg v-bind="$attrs">
    <path :d="mdiAccount" />
  </base-svg>
</template>

<script lang="ts">
  import { mdiAccount } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiAccount }
    }
  })
</script>
