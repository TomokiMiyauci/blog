import MdiChatProcessing from '@/components/atoms/icons/MdiChatProcessing.vue'
import { mdiChatProcessing } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiChatProcessing', () => {
  it('should have mdiChatProcessing', () => {
    const wrapper = shallowMount(MdiChatProcessing)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiChatProcessing)
  })
})
