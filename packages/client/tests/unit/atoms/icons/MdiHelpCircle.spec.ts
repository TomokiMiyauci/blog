import MdiHelpCircle from '@/components/atoms/icons/MdiHelpCircle.vue'
import { mdiHelpCircle } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiHelpCircle', () => {
  it('should have mdiHelpCircle', () => {
    const wrapper = shallowMount(MdiHelpCircle)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiHelpCircle)
  })
})
