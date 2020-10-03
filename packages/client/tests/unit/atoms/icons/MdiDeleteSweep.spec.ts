import MdiDeleteSweep from '@/components/atoms/icons/MdiDeleteSweep.vue'
import { mdiDeleteSweep } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiDeleteSweep', () => {
  it('should have mdiDeleteSweep', () => {
    const wrapper = shallowMount(MdiDeleteSweep)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiDeleteSweep)
  })
})
