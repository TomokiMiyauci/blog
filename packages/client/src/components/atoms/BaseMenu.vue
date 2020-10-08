<template>
  <div class="relative inline-block" @blur="autoClose" @mouseleave="autoClose">
    <slot name="activator" :show="show" :hide="hide" :switchState="switchState">
      <button-circle
        type="button"
        class="inline-flex items-center justify-between"
        @click="show"
        @mouseover="autoOpen"
        @focus="autoOpen"
        @keydown.enter="switchState"
      >
        <slot name="icon" />
        <svg fill="currentColor" viewBox="0 0 20 20" class="flex-shrink-0 w-5 h-5 ml-1">
          <path
            :class="{ 'rotate-180': isVisible }"
            class="transition duration-300 ease-in-out origin-center transform"
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button-circle>
    </slot>

    <transition
      enter-active-class="transition duration-300 ease-out transform"
      enter-class="-translate-y-3 scale-95 opacity-0"
      enter-to-class="translate-y-0 scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in transform"
      leave-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-3 opacity-0"
    >
      <div v-show="isVisible" class="absolute" :class="[xClass, yClass]">
        <base-speech :ydirection="yDirection" :xdirection="xDirection">
          <slot name="menu" :show="show" :hide="hide" />
        </base-speech>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import BaseSpeech from '@/components/atoms/BaseSpeech.vue'
  import useSwitch from '@/core/switch'
  import { defineComponent, toRefs, computed } from '@nuxtjs/composition-api'
  import { Ref } from '@vue/composition-api'

  const useDirection = (direction: {
    top: Ref<boolean>
    bottom: Ref<boolean>
    right: Ref<boolean>
    left: Ref<boolean>
  }) => {
    const { top, bottom, right, left } = direction

    const xClass = computed(() => {
      if (right.value) {
        return 'right-0'
      } else if (left.value) {
        return 'left-0'
      }
    })

    const yClass = computed(() => {
      if (top.value) {
        return 'bottom-0 mb-12'
      } else if (bottom.value) {
        return 'top-0 mt-12'
      }
    })

    const yDirection = computed(() => {
      if (top.value) {
        return 'top'
      } else if (bottom.value) {
        return 'bottom'
      }
    })

    const xDirection = computed(() => {
      if (right.value) {
        return 'right'
      } else if (left.value) {
        return 'left'
      }
    })

    return { xClass, yClass, xDirection, yDirection }
  }

  export default defineComponent({
    props: {
      autoopen: {
        type: Boolean,
        default: true
      },

      top: {
        type: Boolean,
        default: false
      },

      bottom: {
        type: Boolean,
        default: true
      },

      left: {
        type: Boolean,
        default: true
      },

      right: {
        type: Boolean,
        default: false
      }
    },

    components: {
      BaseSpeech
    },

    setup(props) {
      const { top, bottom, left, right, autoopen } = toRefs(props)
      const { state: isVisible, on: show, off: hide, switchState } = useSwitch()

      const autoOpen = (): void => {
        if (autoopen.value) {
          show()
        }
      }

      const autoClose = (): void => {
        if (autoopen.value) {
          hide()
        }
      }

      return {
        isVisible,
        autoOpen,
        autoClose,
        show,
        hide,
        switchState,
        ...useDirection({ top, bottom, left, right })
      }
    }
  })
</script>
