<template>
  <button-circle v-bind="$attrs" v-on="$listeners">
    <mdi-heart />
  </button-circle>
</template>

<script lang="ts">
  import ButtonCircle from '@/components/atoms/buttons/ButtonCircle.vue'
  import MdiHeart from '@/components/atoms/icons/MdiHeart.vue'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      ButtonCircle,
      MdiHeart
    }
  })
</script>
