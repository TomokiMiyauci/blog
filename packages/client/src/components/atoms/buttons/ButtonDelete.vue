<template>
  <button-circle v-bind="$attrs" v-on="$listeners">
    <mdi-delete-sweep />
  </button-circle>
</template>

<script lang="ts">
  import MdiDeleteSweep from '@/components/atoms/atoms/MdiDeleteSweep.vue'
  import ButtonCircle from '@/components/atoms/buttons/ButtonCircle.vue'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      ButtonCircle,
      MdiDeleteSweep
    }
  })
</script>
