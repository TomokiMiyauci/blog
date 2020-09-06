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
  },

  theme: {
    name: 'theme',
    description: 'color mode',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', right: '🔆', title: 'Light' },
        { value: 'dark', right: '🌙', title: 'Dark' }
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

const withTheme: DecoratorFunction = (_, { globals }) => {
  Vue.prototype.$nuxt.$colorMode.preference = globals.theme
  return {
    template: '<story />'
  }
}

export const decorators: DecoratorFunction[] = [withLocale, withTheme]

export const parameters = {
  controls: { expanded: true }
}
