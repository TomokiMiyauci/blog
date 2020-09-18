import MdiCalendarEdit from '@/components/atoms/icons/MdiCalendarEdit.vue'
import { mdiCalendarEdit } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiCalendarEdit', () => {
  it('should have mdiCalendarEdit', () => {
    const wrapper = shallowMount(MdiCalendarEdit)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiCalendarEdit)
  })
})
