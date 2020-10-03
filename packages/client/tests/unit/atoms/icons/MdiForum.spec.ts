import MdiForum from '@/components/atoms/icons/MdiForum.vue'
import { mdiForum } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiForum', () => {
  it('should have mdiForum', () => {
    const wrapper = shallowMount(MdiForum)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiForum)
  })
})
