import MdiHeartOutline from '@/components/atoms/icons/MdiHeartOutline.vue'
import { mdiHeartOutline } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiHeartOutline', () => {
  it('should have mdiHeartOutline', () => {
    const wrapper = shallowMount(MdiHeartOutline)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiHeartOutline)
  })
})
