<template>
  <base-tooltip>
    <template #activator>
      <button-circle v-bind="$attrs" v-on="$listeners">
        <mdi-close-circle />
      </button-circle>
    </template>

    <span>{{ $t('tooltip') }}</span>
  </base-tooltip>
</template>

<script lang="ts">
  import BaseTooltip from '@/components/atoms/BaseTooltip.vue'
  import ButtonCircle from '@/components/atoms/buttons/ButtonCircle.vue'
  import MdiCloseCircle from '@/components/atoms/icons/MdiCloseCircle.vue'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      ButtonCircle,
      MdiCloseCircle,
      BaseTooltip
    }
  })
</script>

<i18n lang="yml">
en:
  tooltip: Close
ja:
  tooltip: 閉じる
</i18n>
