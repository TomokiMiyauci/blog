<template>
  <lazy-base-svg>
    <path :d="mdiClose" />
  </lazy-base-svg>
</template>

<script lang="ts">
  import { mdiClose } from '@mdi/js'
  import { defineComponent } from 'nuxt-composition-api'

  export default defineComponent({
    setup() {
      return { mdiClose }
    }
  })
</script>
