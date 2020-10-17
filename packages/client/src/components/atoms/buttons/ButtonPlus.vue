<template>
  <base-tooltip>
    <template #activator>
      <button-circle v-bind="$attrs" v-on="$listeners">
        <mdi-plus />
      </button-circle>
    </template>

    <span>{{ $t('tooltip') }}</span>
  </base-tooltip>
</template>

<script lang="ts">
  import BaseTooltip from '@/components/atoms/BaseTooltip.vue'
  import ButtonCircle from '@/components/atoms/buttons/ButtonCircle.vue'
  import MdiPlus from '@/components/atoms/icons/MdiPlus.vue'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      ButtonCircle,
      MdiPlus,
      BaseTooltip
    }
  })
</script>

<i18n lang="yml">
en:
  tooltip: Increase
ja:
  tooltip: 増加
</i18n>
