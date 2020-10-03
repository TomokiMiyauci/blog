import MdiHelp from '@/components/atoms/icons/MdiHelp.vue'
import { mdiHelp } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiHelp', () => {
  it('should have mdiHelp', () => {
    const wrapper = shallowMount(MdiHelp)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiHelp)
  })
})
