<template>
  <base-tooltip>
    <template #activator>
      <button-circle v-bind="$attrs" v-on="$listeners">
        <mdi-minus />
      </button-circle>
    </template>

    <span>{{ $t('tooltip') }}</span>
  </base-tooltip>
</template>

<script lang="ts">
  import BaseTooltip from '@/components/atoms/BaseTooltip.vue'
  import ButtonCircle from '@/components/atoms/buttons/ButtonCircle.vue'
  import MdiMinus from '@/components/atoms/icons/MdiMinus.vue'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      ButtonCircle,
      MdiMinus,
      BaseTooltip
    }
  })
</script>

<i18n lang="yml">
en:
  tooltip: Decrease
ja:
  tooltip: 減少
</i18n>
