import MdiSprout from '@/components/atoms/icons/MdiSprout.vue'
import { mdiSprout } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiSprout', () => {
  it('should have mdiSprout', () => {
    const wrapper = shallowMount(MdiSprout)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiSprout)
  })
})
