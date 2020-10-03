import MdiWeatherSunny from '@/components/atoms/icons/MdiWeatherSunny.vue'
import { mdiWeatherSunny } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiWeatherSunny', () => {
  it('should have mdiWeatherSunny', () => {
    const wrapper = shallowMount(MdiWeatherSunny)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiWeatherSunny)
  })
})
