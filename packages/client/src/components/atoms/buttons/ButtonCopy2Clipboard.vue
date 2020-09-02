<template>
  <button ref="button" @click="onClick" @keypress="onClick">
    <transition name="fade-right" mode="out-in">
      <component :is="component" :class="{ 'text-green-500': copy }" />
    </transition>
  </button>
</template>

<script lang="ts">
  import { wait } from '@/utils/timer'
  import { defineComponent, ref, watch, computed } from '@nuxtjs/composition-api'

  const useClipboard = () => {
    const button = ref<HTMLButtonElement>()
    const copy = ref(false)

    watch(copy, async (now) => {
      if (now) {
        await wait(2000)
        copy.value = false
      }
    })

    const onClick = (): void => {
      if (!button.value) return
      const pre = button.value.previousElementSibling

      if (navigator.clipboard && pre && pre.textContent) {
        navigator.clipboard.writeText(pre.textContent)
        copy.value = true
      }
    }

    const component = computed(() => {
      return copy.value ? 'mdi-clipboard-check' : 'mid-clipboard-text'
    })

    return {
      button,
      copy,
      onClick,
      component
    }
  }
  export default defineComponent({
    components: {
      MdiClipboardCheck: () => import('@/components/atoms/icons/MdiClipboardCheck.vue'),
      MidClipboardText: () => import('@/components/atoms/icons/MdiClipboardText.vue')
    },
    setup() {
      return useClipboard()
    }
  })
</script>
