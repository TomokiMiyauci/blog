import MdiTranslate from '@/components/atoms/icons/MdiTranslate.vue'
import { mdiTranslate } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiTranslate', () => {
  it('should have mdiTranslate', () => {
    const wrapper = shallowMount(MdiTranslate)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiTranslate)
  })
})
