import MdiCommentTextMultiple from '@/components/atoms/icons/MdiCommentTextMultiple.vue'
import { mdiCommentTextMultiple } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiCommentTextMultiple', () => {
  it('should have mdiCommentTextMultiple', () => {
    const wrapper = shallowMount(MdiCommentTextMultiple)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiCommentTextMultiple)
  })
})
