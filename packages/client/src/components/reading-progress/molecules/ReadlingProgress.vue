<template>
  <base-progress v-model="value" :max="max" class="fixed top-0 left-0 z-30" />
</template>

<script lang="ts">
  import BaseProgress from '@/components/reading-progress/atoms/BaseProgress.vue'
  import { defineComponent, onBeforeMount, reactive, toRefs, onBeforeUnmount } from '@nuxtjs/composition-api'

  const useReadingProgress = () => {
    const state = reactive({
      value: 0,
      max: 0
    })

    const getMax = (): number => {
      return document.body.clientHeight - window.innerHeight
    }

    const getValue = (): number => {
      return document.scrollingElement?.scrollTop || 0
    }

    const setStates = (): void => {
      state.value = getValue()
      state.max = getMax()
    }

    onBeforeMount(() => {
      state.max = getMax()
      document.addEventListener('scroll', setStates)
      window.addEventListener('resize', setStates)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('scroll', setStates)
      window.removeEventListener('resize', setStates)
    })

    return toRefs(state)
  }

  export default defineComponent({
    components: {
      BaseProgress
    },

    setup() {
      return useReadingProgress()
    }
  })
</script>
