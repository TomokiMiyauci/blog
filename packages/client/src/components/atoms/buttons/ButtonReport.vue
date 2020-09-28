<template>
  <button-circle v-bind="$attrs" v-on="$listeners">
    <mdi-alert-octagram />
  </button-circle>
</template>

<script lang="ts">
  import ButtonCircle from '@/components/atoms/buttons/ButtonCircle.vue'
  import MdiAlertOctagram from '@/components/atoms/icons/MdiAlertOctagram.vue'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      ButtonCircle,
      MdiAlertOctagram
    }
  })
</script>
