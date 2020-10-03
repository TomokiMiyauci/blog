import MdiChevronRight from '@/components/atoms/icons/MdiChevronRight.vue'
import { mdiChevronRight } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiChevronRight', () => {
  it('should have mdiChevronRight', () => {
    const wrapper = shallowMount(MdiChevronRight)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiChevronRight)
  })
})
