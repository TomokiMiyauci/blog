import GoogleIcon from '@/components/atoms/icons/GoogleIcon.vue'
import googleIcon from '@iconify/icons-flat-color-icons/google'
import { shallowMount } from '@vue/test-utils'

describe('GoogleIcon', () => {
  it('should have googleIcon', () => {
    const wrapper = shallowMount(GoogleIcon)
    const vm = wrapper.vm as any

    expect(vm.googleIcon).toEqual(googleIcon)
  })
})
