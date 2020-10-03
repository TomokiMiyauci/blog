import MdiWeb from '@/components/atoms/icons/MdiWeb.vue'
import { mdiWeb } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiWeb', () => {
  it('should have mdiWeb', () => {
    const wrapper = shallowMount(MdiWeb)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiWeb)
  })
})
