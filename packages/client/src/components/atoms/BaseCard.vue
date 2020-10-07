<template>
  <div class="whitespace-no-wrap p-1">
    <slot name="header">
      <slot name="title" />
    </slot>

    <hr class="mt-1 mb-2" />

    <div class="px-4">
      <slot name="body" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api'
  export default defineComponent({})
</script>
