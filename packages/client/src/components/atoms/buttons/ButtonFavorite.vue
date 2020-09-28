<template>
  <button-circle v-bind="$attrs" v-on="$listeners">
    <mdi-heart />
  </button-circle>
</template>

<script lang="ts">
  import MdiHeart from '@/components/atoms/atoms/MdiHeart.vue'
  import ButtonCircle from '@/components/atoms/buttons/ButtonCircle.vue'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      ButtonCircle,
      MdiHeart
    }
  })
</script>
