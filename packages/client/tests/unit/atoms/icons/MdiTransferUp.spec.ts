import MdiTransferUp from '@/components/atoms/icons/MdiTransferUp.vue'
import { mdiTransferUp } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiTransferUp', () => {
  it('should have mdiTransferUp', () => {
    const wrapper = shallowMount(MdiTransferUp)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiTransferUp)
  })
})
