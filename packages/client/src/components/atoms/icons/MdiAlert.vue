<template>
  <base-svg v-bind="$attrs" class="text-yellow-500">
    <path :d="mdiAlert" />
  </base-svg>
</template>

<script lang="ts">
  import { mdiAlert } from '@mdi/js'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { mdiAlert }
    }
  })
</script>
