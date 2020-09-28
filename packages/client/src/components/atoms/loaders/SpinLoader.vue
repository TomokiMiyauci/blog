<template>
  <mdi-loading class="animate-spin text-green-600 dark:text-white" />
</template>

<script lang="ts">
  import MdiLoading from '@/components/atoms/icons/MdiLoading.vue'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      MdiLoading
    }
  })
</script>
