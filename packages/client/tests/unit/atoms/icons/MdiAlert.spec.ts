import MdiAlert from '@/components/atoms/icons/MdiAlert.vue'
import { mdiAlert } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiAlert', () => {
  it('should have mdiAlert', () => {
    const wrapper = shallowMount(MdiAlert)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiAlert)
  })
})
