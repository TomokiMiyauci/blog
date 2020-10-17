<template>
  <base-button ref="button" @click="onClick" @keypress="onClick">
    <transition name="fade-right" mode="out-in">
      <component :is="component" :class="{ 'text-green-500': copy }" />
    </transition>
  </base-button>
</template>

<script lang="ts">
  import BaseButton from '@/components/atoms/BaseButton.vue'
  import MdiClipboardCheck from '@/components/atoms/icons/MdiClipboardCheck.vue'
  import MdiClipboardText from '@/components/atoms/icons/MdiClipboardText.vue'
  import { wait } from '@/utils/timer'
  import { defineComponent, ref, watch, computed } from '@nuxtjs/composition-api'

  const useClipboard = () => {
    const button = ref<InstanceType<typeof BaseButton>>()
    const copy = ref(false)

    watch(copy, async (now) => {
      if (now) {
        await wait(2000)
        copy.value = false
      }
    })

    const onClick = (): void => {
      if (!button.value) return
      const pre = button.value.$parent.$el.previousElementSibling

      if (navigator.clipboard && pre?.textContent) {
        navigator.clipboard.writeText(pre.textContent)
        copy.value = true
      }
    }

    const component = computed(() => {
      return copy.value ? 'mdi-clipboard-check' : 'mdi-clipboard-text'
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
      BaseButton,
      MdiClipboardCheck,
      MdiClipboardText
    },

    setup() {
      return useClipboard()
    }
  })
</script>
