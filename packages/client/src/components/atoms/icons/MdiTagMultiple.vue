<template>
  <base-svg>
    <path :d="mdiTagMultiple" />
  </base-svg>
</template>

<script lang="ts">
  import { mdiTagMultiple } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiTagMultiple }
    }
  })
</script>
