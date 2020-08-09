<template>
  <base-svg v-bind="$attrs">
    <path :d="mdiTimer" />
  </base-svg>
</template>

<script lang="ts">
  import { mdiTimer } from '@mdi/js'
  import { defineComponent } from 'nuxt-composition-api'

  export default defineComponent({
    setup() {
      return { mdiTimer }
    }
  })
</script>
