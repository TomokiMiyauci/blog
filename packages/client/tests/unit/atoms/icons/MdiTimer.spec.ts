import MdiTimer from '@/components/atoms/icons/MdiTimer.vue'
import { mdiTimer } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiTimer', () => {
  it('should have mdiTimer', () => {
    const wrapper = shallowMount(MdiTimer)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiTimer)
  })
})
