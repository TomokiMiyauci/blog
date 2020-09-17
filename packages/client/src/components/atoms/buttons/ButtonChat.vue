<template>
  <button-circle v-bind="$attrs" v-on="$listeners">
    <mdi-forum class="w-12 h-12" />
  </button-circle>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api'
  export default defineComponent({})
</script>
