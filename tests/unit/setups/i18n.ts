import { config } from '@vue/test-utils'

if (config.stubs && config.mocks) {
  config.stubs['nuxt-link'] = true
  config.mocks.$t = (i: any) => i
  config.mocks.localePath = (i: any) => i
}
