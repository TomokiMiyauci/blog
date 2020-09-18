import MdiTagMultiple from '@/components/atoms/icons/MdiTagMultiple.vue'
import { mdiTagMultiple } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiTagMultiple', () => {
  it('should have mdiTagMultiple', () => {
    const wrapper = shallowMount(MdiTagMultiple)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiTagMultiple)
  })
})
