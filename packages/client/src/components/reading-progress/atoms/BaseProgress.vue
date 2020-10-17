<template>
  <progress class="h-1 appearance-none w-full" :max="max" :value="value" />
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    props: {
      max: {
        type: [String, Number],
        default: 0
      },

      value: {
        type: [String, Number],
        default: 0
      }
    }
  })
</script>

<style lang="scss">
  progress[value] {
    &::-webkit-progress-bar {
      background-color: transparent;
    }

    &::-webkit-progress-value {
      @apply bg-gradient-to-r to-green-400 from-teal-700;
    }

    &::-moz-progress-bar {
      @apply bg-gradient-to-r to-green-400 from-teal-700;
    }
  }
</style>
