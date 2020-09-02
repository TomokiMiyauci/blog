<template>
  <BaseIconifyIcon :icon="storyBook" />
</template>

<script lang="ts">
  import storyBook from '@iconify/icons-logos/storybook-icon'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { storyBook }
    }
  })
</script>
