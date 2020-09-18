import MdiAlertOctagram from '@/components/atoms/icons/MdiAlertOctagram.vue'
import { mdiAlertOctagram } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiAlertOctagram', () => {
  it('should have mdiAlertOctagram', () => {
    const wrapper = shallowMount(MdiAlertOctagram)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiAlertOctagram)
  })
})
