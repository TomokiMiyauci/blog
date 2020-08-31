import ButtonCopy2Clipboard from '@/components/atoms/buttons/ButtonCopy2Clipboard.vue'
import { wait } from '@/utils/timer'
import { onMounted } from '@nuxtjs/composition-api'
import Vue from 'vue'

export const useRegisterCopyButton = (): void => {
  onMounted(async () => {
    await wait(0)

    const blocks = Array.from(document.getElementsByClassName('nuxt-content-highlight'))
    blocks.forEach((block) => {
      const Copy2Clipboard = Vue.extend(ButtonCopy2Clipboard as any)
      block.appendChild(new Copy2Clipboard().$mount().$el)
    })
  })
}
