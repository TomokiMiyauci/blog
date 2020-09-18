import MdiEye from '@/components/atoms/icons/MdiEye.vue'
import { mdiEye } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiEye', () => {
  it('should have mdiEye', () => {
    const wrapper = shallowMount(MdiEye)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiEye)
  })
})
