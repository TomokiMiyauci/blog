<template>
  <span class="relative" @mouseover="on" @focus="on" @mouseleave="off" @blur="off">
    <slot name="activator" />
    <transition name="scale-in">
      <span
        v-show="state"
        class="text-white absolute right-0 -mb-12 whitespace-no-wrap bottom-0 bg-gray-700 bg-opacity-75 rounded-md p-2 shadow"
      >
        <slot />
      </span>
    </transition>
  </span>
</template>

<script lang="ts">
  import useSwitch from '@/core/switch'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      return useSwitch()
    }
  })
</script>

<style lang="scss">
  .scale-in-enter {
    @apply transform origin-center scale-0;
  }

  .scale-in-enter-active {
    @apply transition-transform duration-200;
  }

  .scale-in-enter-to {
    @apply scale-100;
  }

  .scale-in-leave-active {
    @apply transition-opacity duration-300;
  }

  .scale-in-leave-to {
    @apply opacity-0;
  }
</style>
