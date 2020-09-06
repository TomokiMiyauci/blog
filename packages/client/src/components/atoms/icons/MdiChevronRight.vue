<template>
  <base-svg>
    <path :d="mdiChevronRight" />
  </base-svg>
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
