<template>
  <button-circle v-bind="$attrs" v-on="$listeners">
    <mdi-chevron-left />
  </button-circle>
</template>

<script lang="ts">
  import ButtonCircle from '@/components/atoms/buttons/ButtonCircle.vue'
  import MdiChevronLeft from '@/components/atoms/icons/MdiChevronLeft.vue'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      ButtonCircle,
      MdiChevronLeft
    }
  })
</script>
