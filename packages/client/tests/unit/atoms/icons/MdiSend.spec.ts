import MdiSend from '@/components/atoms/icons/MdiSend.vue'
import { mdiSend } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiSend', () => {
  it('should have mdiSend', () => {
    const wrapper = shallowMount(MdiSend)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiSend)
  })
})
