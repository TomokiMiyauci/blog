import ProjectCredit from '@/components/app/atoms/ProjectCredit.vue'
import { shallowMount } from '@vue/test-utils'

describe('ProjectCredit', () => {
  it('should show year and name when give its', () => {
    const wrapper = shallowMount(ProjectCredit, {
      propsData: {
        year: 2019,
        name: 'test'
      }
    })
    const text = wrapper.text()

    expect(text).toContain('2019')
    expect(text).toContain('test')
  })
})
