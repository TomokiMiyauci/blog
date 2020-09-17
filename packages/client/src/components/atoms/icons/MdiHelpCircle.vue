<template>
  <base-svg v-bind="$attrs">
    <path :d="mdiHelpCircle" />
  </base-svg>
</template>

<script lang="ts">
  import { mdiHelpCircle } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiHelpCircle }
    }
  })
</script>
