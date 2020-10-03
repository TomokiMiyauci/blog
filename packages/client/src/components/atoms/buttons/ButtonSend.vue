<template>
  <button-circle v-bind="$attrs" v-on="$listeners">
    <mdi-send />
  </button-circle>
</template>

<script lang="ts">
  import ButtonCircle from '@/components/atoms/buttons/ButtonCircle.vue'
  import MdiSend from '@/components/atoms/icons/MdiSend.vue'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      ButtonCircle,
      MdiSend
    }
  })
</script>
