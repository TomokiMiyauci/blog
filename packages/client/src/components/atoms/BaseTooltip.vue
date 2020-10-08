<template>
  <span class="relative" @mouseenter="on" @mouseleave="off" @blur="off" @focus="on">
    <slot name="activator" />
    <transition name="scale-in">
      <span
        v-show="state"
        class="text-white absolute right-0 whitespace-no-wrap bg-gray-700 bg-opacity-75 rounded-md p-2 shadow"
        :class="[yDirection]"
      >
        <slot />
      </span>
    </transition>
  </span>
</template>

<script lang="ts">
  import useSwitch from '@/core/switch'
  import { defineComponent, toRefs, computed } from '@nuxtjs/composition-api'
  import { Ref } from '@vue/composition-api'

  const useDirection = (direction: { top: Ref<boolean>; bottom: Ref<boolean> }) => {
    const { top, bottom } = direction

    const yDirection = computed(() => {
      if (top.value) {
        return 'top-0 -mt-12'
      } else if (bottom.value) {
        return 'bottom-0 -mb-12'
      }
    })

    return { yDirection }
  }

  export default defineComponent({
    props: {
      top: {
        type: Boolean,
        default: false
      },

      bottom: {
        type: Boolean,
        default: true
      }
    },

    setup(props) {
      return { ...useSwitch(), ...useDirection(toRefs(props)) }
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
