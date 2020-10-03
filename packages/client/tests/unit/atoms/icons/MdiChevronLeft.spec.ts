import MdiChevronLeft from '@/components/atoms/icons/MdiChevronLeft.vue'
import { mdiChevronLeft } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiChevronLeft', () => {
  it('should have mdiChevronLeft', () => {
    const wrapper = shallowMount(MdiChevronLeft)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiChevronLeft)
  })
})
