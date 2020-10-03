import MdiPost from '@/components/atoms/icons/MdiPost.vue'
import { mdiPost } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiPost', () => {
  it('should have mdiPost', () => {
    const wrapper = shallowMount(MdiPost)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiPost)
  })
})
