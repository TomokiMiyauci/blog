<template>
  <BaseIconifyIcon v-bind="$attrs" :icon="googleIcon" />
</template>

<script lang="ts">
  import googleIcon from '@iconify/icons-flat-color-icons/google'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return { googleIcon }
    }
  })
</script>
