import MdiWeatherNight from '@/components/atoms/icons/MdiWeatherNight.vue'
import { mdiWeatherNight } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

describe('MdiWeatherNight', () => {
  it('should have mdiWeatherNight', () => {
    const wrapper = shallowMount(MdiWeatherNight)
    const path = wrapper.find('path')

    expect(path.attributes().d).toBe(mdiWeatherNight)
  })
})
