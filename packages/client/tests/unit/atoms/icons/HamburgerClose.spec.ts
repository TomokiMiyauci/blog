import HamburgerClose from '@/components/atoms/icons/HamburgerClose.vue'
import { shallowMount } from '@vue/test-utils'

describe('HamburgerClose', () => {
  it('should have class of text-green-500 when give props of active is true', () => {
    const wrapper = shallowMount(HamburgerClose, {
      propsData: {
        active: true
      }
    })

    expect(wrapper.classes()).toContain('text-green-500')
  })
})
