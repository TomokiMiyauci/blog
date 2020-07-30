import BaseTag from '@/components/atoms/BaseTag.vue'
import { shallowMount, RouterLinkStub } from '@vue/test-utils'

describe('BaseTag.vue', () => {
  it('should innerText is equal to props of name', () => {
    const name = 'test'
    const wrapper = shallowMount(BaseTag, { propsData: { name }, stubs: { NuxtLink: RouterLinkStub } })

    expect(wrapper.text()).toBe(name)
  })
})
