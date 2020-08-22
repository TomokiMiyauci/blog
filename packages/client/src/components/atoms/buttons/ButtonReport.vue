<template>
  <lazy-button-circle v-bind="$attrs" v-on="$listeners">
    <lazy-mdi-alert-octagram />
  </lazy-button-circle>
</template>

<script lang="ts">
  import { defineComponent } from 'nuxt-composition-api'
  export default defineComponent({})
</script>
