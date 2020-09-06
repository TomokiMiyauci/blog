<template>
  <base-snackbar ref="snackbar" class="bg-gray-800 dark:bg-white">
    <template #icon>
      <mdi-check-circle class="text-teal-500" />
    </template>
    <template #text>
      <span class="text-white dark:text-teal-900">{{ $t('NOTICE.SUCCESS.POST') }}</span>
    </template>
  </base-snackbar>
</template>

<script lang="ts">
  import type BaseSnackbar from '@/components/molecules/BaseSnackbar.vue'
  import { defineComponent, ref } from '@nuxtjs/composition-api'
  export default defineComponent({
    setup() {
      const snackbar = ref<InstanceType<typeof BaseSnackbar>>()

      return {
        snackbar,
        open: () => {
          if (!snackbar.value) return
          snackbar.value.open()
        }
      }
    }
  })
</script>
