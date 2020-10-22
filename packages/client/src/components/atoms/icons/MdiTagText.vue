<template>
  <base-svg>
    <path :d="mdiTagText" />
  </base-svg>
</template>

<script lang="ts">
  import { mdiTagText } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiTagText }
    }
  })
</script>
