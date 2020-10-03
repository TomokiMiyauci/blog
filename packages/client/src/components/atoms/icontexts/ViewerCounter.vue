<template>
  <base-icon-text v-bind="$attrs">
    <mdi-eye />
  </base-icon-text>
</template>

<script lang="ts">
  import BaseIconText from '@/components/atoms/BaseIconText.vue'
  import MdiEye from '@/components/atoms/icons/MdiEye.vue'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      BaseIconText,
      MdiEye
    }
  })
</script>
