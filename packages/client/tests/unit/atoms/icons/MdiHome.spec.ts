import MdiHome from '@/components/atoms/icons/MdiHome.vue'
import { mdiHome } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiHome', () => {
  it('should have mdiHome', () => {
    const wrapper = shallowMount(MdiHome)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiHome)
  })
})
