import MdiEmail from '@/components/atoms/icons/MdiEmail.vue'
import { mdiEmail } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiEmail', () => {
  it('should have mdiEmail', () => {
    const wrapper = shallowMount(MdiEmail)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiEmail)
  })
})
