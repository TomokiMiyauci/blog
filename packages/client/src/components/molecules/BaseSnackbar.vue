<template>
  <transition name="fade-left">
    <div
      v-show="isOpen"
      class="flex items-center hover:shadow-lg transition-shadow duration-700 rounded-full shadow dark:shadow-lg p-1 pl-5"
    >
      <slot name="icon" />
      <div class="ml-3">
        <slot name="text" />
      </div>
      <button-close class="ml-10 bg-white hover:bg-teal-500 dark:bg-gray-800 dark-hover:bg-teal-500" @click="close" />
    </div>
  </transition>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from '@nuxtjs/composition-api'

  const useAutoClose = (milliseconeds: number) => {
    const isOpen = ref(false)
    const timeoutId = ref<NodeJS.Timeout>()

    const open = (): void => {
      isOpen.value = true
    }

    const close = (): void => {
      if (timeoutId.value) {
        clearTimeout(timeoutId.value)
      }
      isOpen.value = false
    }

    watch(isOpen, (now, prev) => {
      if (now && !prev) {
        timeoutId.value = setTimeout(() => {
          isOpen.value = false
          if (timeoutId.value) {
            clearTimeout(timeoutId.value)
          }
        }, milliseconeds)
      }
    })

    return { isOpen, open, close, timeoutId }
  }
  export default defineComponent({
    props: {
      milliseconeds: {
        type: Number,
        default: 5000
      }
    },
    setup(props) {
      return useAutoClose(props.milliseconeds)
    }
  })
</script>
