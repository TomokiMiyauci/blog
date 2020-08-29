<template>
  <lazy-base-svg v-bind="$attrs">
    <path :d="mdiCheckCircle" />
  </lazy-base-svg>
</template>

<script lang="ts">
  import { mdiCheckCircle } from '@mdi/js'
  import { defineComponent } from 'nuxt-composition-api'

  export default defineComponent({
    setup() {
      return { mdiCheckCircle }
    }
  })
</script>
