import NuxtIcon from '@/components/atoms/icons/NuxtIcon.vue'
import nuxtIcon from '@iconify/icons-logos/nuxt-icon'
import { shallowMount } from '@vue/test-utils'

describe('NuxtIcon', () => {
  it('should have nuxtIcon', () => {
    const wrapper = shallowMount(NuxtIcon)
    const vm = wrapper.vm as any

    expect(vm.nuxtIcon).toEqual(nuxtIcon)
  })
})
