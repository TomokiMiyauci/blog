import MdiClose from '@/components/atoms/icons/MdiClose.vue'
import { mdiClose } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiClose', () => {
  it('should have mdiClose', () => {
    const wrapper = shallowMount(MdiClose)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiClose)
  })
})
