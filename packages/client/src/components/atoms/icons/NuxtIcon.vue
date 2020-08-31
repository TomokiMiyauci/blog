<template>
  <BaseIconifyIcon v-bind="$attrs" :icon="nuxtIcon" />
</template>

<script lang="ts">
  import nuxtIcon from '@iconify/icons-logos/nuxt-icon'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { nuxtIcon }
    }
  })
</script>
