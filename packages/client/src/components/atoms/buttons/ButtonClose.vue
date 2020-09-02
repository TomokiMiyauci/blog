<template>
  <lazy-button-circle v-bind="$attrs" v-on="$listeners">
    <lazy-mdi-close-circle />
  </lazy-button-circle>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api'
  export default defineComponent({})
</script>
