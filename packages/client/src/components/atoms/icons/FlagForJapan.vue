<template>
  <BaseIconifyIcon v-bind="$attrs" :icon="flagForJapan" />
</template>

<script lang="ts">
  import flagForJapan from '@iconify/icons-emojione/flag-for-japan'
  import { defineComponent } from '@nuxtjs/composition-api'
  export default defineComponent({
    setup() {
      return { flagForJapan }
    }
  })
</script>
