import MdiMagnify from '@/components/atoms/icons/MdiMagnify.vue'
import { mdiMagnify } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiMagnify', () => {
  it('should have mdiMagnify', () => {
    const wrapper = shallowMount(MdiMagnify)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiMagnify)
  })
})
