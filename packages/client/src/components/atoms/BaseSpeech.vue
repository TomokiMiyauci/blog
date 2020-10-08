<template>
  <div
    class="relative p-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-md shadow hover:shadow-md transition duration-300 ease-in-out"
  >
    <div
      class="absolute w-4 h-4 origin-center transform bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-700 rounded-sm pointer-events-none transition duration-300 ease-in-out"
      :class="[xClass, yClass]"
    ></div>
    <div class="relative">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, toRefs, computed } from '@nuxtjs/composition-api'
  import { Ref } from '@vue/composition-api'

  const useDirection = (direction: { xdirection: Ref<string>; ydirection: Ref<string> }) => {
    const { xdirection, ydirection } = direction
    const yClass = computed(() => {
      switch (ydirection.value) {
        case 'top': {
          return 'border-b border-l -rotate-45 bottom-0 translate-y-2'
        }

        case 'bottom': {
          return 'border-t border-l rotate-45 top-0 -translate-y-2'
        }
      }
    })

    const xClass = computed(() => {
      switch (xdirection.value) {
        case 'right': {
          return '-translate-x-4 right-0'
        }

        case 'left':
        default: {
          return 'translate-x-8 left-0'
        }
      }
    })

    return {
      xClass,
      yClass
    }
  }

  const yDirections = ['bottom', 'top']
  const xDirections = ['left', 'right']

  export default defineComponent({
    props: {
      ydirection: {
        type: String,
        default: 'top',
        validate: (v: string) => {
          return yDirections.includes(v)
        }
      },

      xdirection: {
        type: String,
        default: 'left',
        validate: (v: string) => {
          return xDirections.includes(v)
        }
      }
    },

    setup(props) {
      return { ...useDirection(toRefs(props)) }
    }
  })
</script>
