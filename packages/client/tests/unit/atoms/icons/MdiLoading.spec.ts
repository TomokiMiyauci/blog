import MdiLoading from '@/components/atoms/icons/MdiLoading.vue'
import { mdiLoading } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiLoading', () => {
  it('should have mdiLoading', () => {
    const wrapper = shallowMount(MdiLoading)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiLoading)
  })
})
