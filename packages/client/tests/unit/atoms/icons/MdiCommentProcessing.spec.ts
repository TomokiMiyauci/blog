import MdiCommentProcessing from '@/components/atoms/icons/MdiCommentProcessing.vue'
import { mdiCommentProcessing } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiCommentProcessing', () => {
  it('should have mdiCommentProcessing', () => {
    const wrapper = shallowMount(MdiCommentProcessing)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiCommentProcessing)
  })
})
