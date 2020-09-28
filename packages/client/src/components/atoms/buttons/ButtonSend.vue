<template>
  <button-circle v-bind="$attrs" v-on="$listeners">
    <mdi-send />
  </button-circle>
</template>

<script lang="ts">
  import MdiSend from '@/components/atoms/atoms/MdiSend.vue'
  import ButtonCircle from '@/components/atoms/buttons/ButtonCircle.vue'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      ButtonCircle,
      MdiSend
    }
  })
</script>
