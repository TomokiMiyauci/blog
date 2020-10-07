<template>
  <base-tooltip>
    <template #activator>
      <button-circle v-bind="$attrs" v-on="$listeners">
        <mdi-delete-sweep />
      </button-circle>
    </template>

    <span>{{ $t('tooltip') }}</span>
  </base-tooltip>
</template>

<script lang="ts">
  import BaseTooltip from '@/components/atoms/BaseTooltip.vue'
  import ButtonCircle from '@/components/atoms/buttons/ButtonCircle.vue'
  import MdiDeleteSweep from '@/components/atoms/icons/MdiDeleteSweep.vue'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      ButtonCircle,
      BaseTooltip,
      MdiDeleteSweep
    }
  })
</script>

<i18n lang="yml">
en:
  tooltip: Delete
ja:
  tooltip: 削除
</i18n>
