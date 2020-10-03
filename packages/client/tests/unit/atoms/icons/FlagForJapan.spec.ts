import FlagForJapan from '@/components/atoms/icons/FlagForJapan.vue'
import flagForJapan from '@iconify/icons-emojione/flag-for-japan'
import { shallowMount } from '@vue/test-utils'

describe('FlagForJapan', () => {
  it('should have flagForJapan', () => {
    const wrapper = shallowMount(FlagForJapan)
    const vm = wrapper.vm as any

    expect(vm.flagForJapan).toEqual(flagForJapan)
  })
})
