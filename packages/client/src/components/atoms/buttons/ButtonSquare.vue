<template>
  <base-button
    class="p-3 focus:outline-none rounded-md items-center hover:bg-gray-100 dark-hover:bg-gray-700 dark-disabled:bg-transparent transition duration-500 justify-center inline-flex disabled:cursor-not-allowed disabled:text-gray-500 disabled:bg-transparent"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </base-button>
</template>

<script lang="ts">
  import BaseButton from '@/components/atoms/BaseButton.vue'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      BaseButton
    }
  })
</script>
