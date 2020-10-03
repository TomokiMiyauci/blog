import MdiClipboardText from '@/components/atoms/icons/MdiClipboardText.vue'
import { mdiClipboardText } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiClipboardText', () => {
  it('should have mdiClipboardText', () => {
    const wrapper = shallowMount(MdiClipboardText)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiClipboardText)
  })
})
