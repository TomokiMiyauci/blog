import MdiPackageVariantClosed from '@/components/atoms/icons/MdiPackageVariantClosed.vue'
import { mdiPackageVariantClosed } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiPackageVariantClosed', () => {
  it('should have mdiPackageVariantClosed', () => {
    const wrapper = shallowMount(MdiPackageVariantClosed)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiPackageVariantClosed)
  })
})
