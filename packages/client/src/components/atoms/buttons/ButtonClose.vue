<template>
  <button-circle v-bind="$attrs" v-on="$listeners">
    <mdi-close-circle />
  </button-circle>
</template>

<script lang="ts">
  import ButtonCircle from '@/components/atoms/buttons/ButtonCircle.vue'
  import MdiCloseCircle from '@/components/atoms/icons/MdiCloseCircle.vue'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      ButtonCircle,
      MdiCloseCircle
    }
  })
</script>
