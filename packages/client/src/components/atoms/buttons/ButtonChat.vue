<template>
  <button-circle v-bind="$attrs" v-on="$listeners">
    <mdi-forum class="w-12 h-12" />
  </button-circle>
</template>

<script lang="ts">
  import MdiForum from '@/components/atoms/atoms/MdiForum.vue'
  import ButtonCircle from '@/components/atoms/buttons/ButtonCircle.vue'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      ButtonCircle,
      MdiForum
    }
  })
</script>
