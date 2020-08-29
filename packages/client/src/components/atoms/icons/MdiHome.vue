<template>
  <lazy-base-svg>
    <path :d="mdiHome" />
  </lazy-base-svg>
</template>

<script lang="ts">
  import { mdiHome } from '@mdi/js'
  import { defineComponent } from 'nuxt-composition-api'

  export default defineComponent({
    setup() {
      return { mdiHome }
    }
  })
</script>
