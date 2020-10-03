import MdiInformation from '@/components/atoms/icons/MdiInformation.vue'
import { mdiInformation } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiInformation', () => {
  it('should have mdiInformation', () => {
    const wrapper = shallowMount(MdiInformation)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiInformation)
  })
})
