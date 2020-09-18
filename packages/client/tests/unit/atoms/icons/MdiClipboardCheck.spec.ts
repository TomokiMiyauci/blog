import MdiClipboardCheck from '@/components/atoms/icons/MdiClipboardCheck.vue'
import { mdiClipboardCheck } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiClipboardCheck', () => {
  it('should have mdiClipboardCheck', () => {
    const wrapper = shallowMount(MdiClipboardCheck)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiClipboardCheck)
  })
})
