import MdiSlashForward from '@/components/atoms/icons/MdiSlashForward.vue'
import { mdiSlashForward } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiSlashForward', () => {
  it('should have mdiSlashForward', () => {
    const wrapper = shallowMount(MdiSlashForward)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiSlashForward)
  })
})
