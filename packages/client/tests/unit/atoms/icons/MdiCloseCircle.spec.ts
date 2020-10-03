import MdiCloseCircle from '@/components/atoms/icons/MdiCloseCircle.vue'
import { mdiCloseCircle } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiCloseCircle', () => {
  it('should have mdiCloseCircle', () => {
    const wrapper = shallowMount(MdiCloseCircle)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiCloseCircle)
  })
})
