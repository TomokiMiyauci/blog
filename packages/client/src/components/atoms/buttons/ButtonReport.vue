<template>
  <button-circle v-bind="$attrs" v-on="$listeners">
    <mdi-alert-octagram />
  </button-circle>
</template>

<script lang="ts">
  import MdiAlertOctagram from '@/components/atoms/atoms/MdiAlertOctagram.vue'
  import ButtonCircle from '@/components/atoms/buttons/ButtonCircle.vue'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      ButtonCircle,
      MdiAlertOctagram
    }
  })
</script>
