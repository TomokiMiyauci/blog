import '~~/.nuxt-storybook/storybook/preview.js'
import { DecoratorFunction } from '@storybook/addons'
import Vue from 'vue'

export const globalTypes = {
  locale: {
    name: 'locale',
    description: 'i18n',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: '🇺🇸', title: 'English' },
        { value: 'ja', right: '🇯🇵', title: '日本語' }
      ]
    }
  }
}

const withLocale: DecoratorFunction = (_, { globals }) => {
  Vue.prototype.$nuxt.$i18n.locale = globals.locale
  return {
    template: '<story />'
  }
}

export const decorators: DecoratorFunction[] = [withLocale]

export const parameters = {
  controls: { expanded: true }
}
