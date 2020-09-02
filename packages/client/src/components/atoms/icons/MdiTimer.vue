<template>
  <lazy-base-svg v-bind="$attrs">
    <path :d="mdiTimer" />
  </lazy-base-svg>
</template>

<script lang="ts">
  import { mdiTimer } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiTimer }
    }
  })
</script>
