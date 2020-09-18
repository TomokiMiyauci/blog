import MdiAccount from '@/components/atoms/icons/MdiAccount.vue'
import { mdiAccount } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiAccount', () => {
  it('should have mdiAccount', () => {
    const wrapper = shallowMount(MdiAccount)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiAccount)
  })
})
