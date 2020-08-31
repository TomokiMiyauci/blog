<template>
  <lazy-base-svg>
    <path :d="mdiTranslate" />
  </lazy-base-svg>
</template>

<script lang="ts">
  import { mdiTranslate } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiTranslate }
    }
  })
</script>
