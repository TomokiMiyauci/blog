import MdiGithub from '@/components/atoms/icons/MdiGithub.vue'
import { mdiGithub } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiGithub', () => {
  it('should have mdiGithub', () => {
    const wrapper = shallowMount(MdiGithub)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiGithub)
  })
})
