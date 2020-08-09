<template>
  <nuxt-link v-bind="$attrs" class="transition-colors hover:text-green-500 duration-300 ease-linear" v-on="$listeners">
    <slot />
  </nuxt-link>
</template>

<script lang="ts">
  import { defineComponent } from 'nuxt-composition-api'
  export default defineComponent({})
</script>
