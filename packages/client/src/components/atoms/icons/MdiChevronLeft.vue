<template>
  <lazy-base-svg>
    <path :d="mdiChevronLeft" />
  </lazy-base-svg>
</template>

<script lang="ts">
  import { mdiChevronLeft } from '@mdi/js'
  import { defineComponent } from 'nuxt-composition-api'

  export default defineComponent({
    setup() {
      return { mdiChevronLeft }
    }
  })
</script>
