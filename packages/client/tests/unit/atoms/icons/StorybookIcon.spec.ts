import StorybookIcon from '@/components/atoms/icons/StorybookIcon.vue'
import storyBook from '@iconify/icons-logos/storybook-icon'
import { shallowMount } from '@vue/test-utils'

describe('StorybookIcon', () => {
  it('should have storyBook', () => {
    const wrapper = shallowMount(StorybookIcon)
    const vm = wrapper.vm as any

    expect(vm.storyBook).toEqual(storyBook)
  })
})
