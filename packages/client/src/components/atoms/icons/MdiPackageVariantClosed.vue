<template>
  <lazy-base-svg class="text-purple-700" v-bind="$attrs">
    <path :d="mdiPackageVariantClosed" />
  </lazy-base-svg>
</template>

<script lang="ts">
  import { mdiPackageVariantClosed } from '@mdi/js'
  import { defineComponent } from 'nuxt-composition-api'

  export default defineComponent({
    setup() {
      return { mdiPackageVariantClosed }
    }
  })
</script>
