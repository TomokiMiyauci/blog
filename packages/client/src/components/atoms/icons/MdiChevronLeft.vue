<template>
  <base-svg>
    <path :d="mdiChevronLeft" />
  </base-svg>
</template>

<script lang="ts">
  import { mdiChevronLeft } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiChevronLeft }
    }
  })
</script>
