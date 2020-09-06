<template>
  <button-circle v-bind="$attrs" v-on="$listeners">
    <mdi-delete-sweep />
  </button-circle>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api'
  export default defineComponent({})
</script>
