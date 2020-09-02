<template>
  <lazy-base-svg>
    <path :d="mdiChevronRight" />
  </lazy-base-svg>
</template>

<script lang="ts">
  import { mdiChevronRight } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiChevronRight }
    }
  })
</script>
