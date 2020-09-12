<template>
  <base-svg>
    <path :d="mdiHome" />
  </base-svg>
</template>

<script lang="ts">
  import { mdiHome } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiHome }
    }
  })
</script>
