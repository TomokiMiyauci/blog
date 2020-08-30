<template>
  <lazy-base-svg v-bind="$attrs">
    <path :d="mdiPost" />
  </lazy-base-svg>
</template>

<script lang="ts">
  import { mdiPost } from '@mdi/js'
  import { defineComponent } from 'nuxt-composition-api'

  export default defineComponent({
    setup() {
      return { mdiPost }
    }
  })
</script>
