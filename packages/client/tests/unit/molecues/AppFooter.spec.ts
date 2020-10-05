import AppFooter from '@/components/app/molecules/AppFooter.vue'
import { shallowMount } from '@vue/test-utils'

describe('AppFooter', () => {
  it('should show year and name when give its', () => {
    const wrapper = shallowMount(AppFooter, {
      propsData: {
        year: 2019,
        name: 'test'
      }
    })
    const span = wrapper.find('span')
    const text = span.text()

    expect(text).toContain('2019')
    expect(text).toContain('test')
  })
})
