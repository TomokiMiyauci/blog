<template>
  <div class="relative inline-block" @blur="autoClose" @mouseleave="autoClose">
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
    <transition
      enter-active-class="transition duration-300 ease-out transform"
      enter-class="-translate-y-3 scale-95 opacity-0"
      enter-to-class="translate-y-0 scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in transform"
      leave-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-3 opacity-0"
    >
      <div v-show="isVisible" class="absolute pt-2">
        <base-speech>
          <slot name="menu" />
        </base-speech>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import BaseSpeech from '@/components/atoms/BaseSpeech.vue'
  import useSwitch from '@/core/switch'
  import { defineComponent } from '@nuxtjs/composition-api'
  export default defineComponent({
    props: {
      openOnHover: {
        type: Boolean,
        default: true
      }
    },

    components: {
      BaseSpeech
    },

    setup(props) {
      const { state: isVisible, on: show, off: hide, switchState } = useSwitch()

      const autoOpen = (): void => {
        if (props.openOnHover) {
          show()
        }
      }

      const autoClose = (): void => {
        if (props.openOnHover) {
          hide()
        }
      }

      return { isVisible, autoOpen, autoClose, show, switchState, onClick: () => {} }
    }
  })
</script>
