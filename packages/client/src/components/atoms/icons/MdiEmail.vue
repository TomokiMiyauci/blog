<template>
  <base-svg v-bind="$attrs">
    <path :d="mdiEmail" />
  </base-svg>
</template>

<script lang="ts">
  import { mdiEmail } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiEmail }
    }
  })
</script>
