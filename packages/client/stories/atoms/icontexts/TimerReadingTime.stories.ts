import { addDecorator } from '@storybook/vue'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
export default {
  title: 'TimerReadingTime'
}

const i18n = new VueI18n({
  locale: 'en'
})
Vue.use(VueI18n)

addDecorator(() => ({
  template: '<story/>',
  i18n
}))

Vue.mixin({
  i18n,
  methods: {
    localePath: (route: any, locale?: string | undefined) => ({ route, locale })
  }
})

export const DEFAULT = () => ({
  template: '<timer-reading-time :text="text" />',
  props: {
    text: {
      default: '1'
    }
  }
})
