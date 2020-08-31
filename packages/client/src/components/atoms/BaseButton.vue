<template>
  <button class="p-1" v-bind="$attrs" v-on="$listeners">
    <slot />
  </button>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api'
  export default defineComponent({})
</script>
