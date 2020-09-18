import MdiCheckCircle from '@/components/atoms/icons/MdiCheckCircle.vue'
import { mdiCheckCircle } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiCheckCircle', () => {
  it('should have mdiCheckCircle', () => {
    const wrapper = shallowMount(MdiCheckCircle)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiCheckCircle)
  })
})
