import MdiBookmark from '@/components/atoms/icons/MdiBookmark.vue'
import { mdiBookmark } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiBookmark', () => {
  it('should have mdiBookmark', () => {
    const wrapper = shallowMount(MdiBookmark)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiBookmark)
  })
})
