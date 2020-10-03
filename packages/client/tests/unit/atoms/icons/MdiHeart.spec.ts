import MdiHeart from '@/components/atoms/icons/MdiHeart.vue'
import { mdiHeart } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiHeart', () => {
  it('should have mdiHeart', () => {
    const wrapper = shallowMount(MdiHeart)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiHeart)
  })
})
