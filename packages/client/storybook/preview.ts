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

const template =
  '<story ><div><portal-target class="fixed" style="top: 50%; left: 50%; transform: translate(-50%, -50%)" name="center" /><portal-target class="fixed rigth-0 bottom-0 mb-5 ml-5" name="notice" /><portal-target class="fixed right-0 mb-2 mr-2 bottom-0 md:mb-32 md:mr-10" name="bottom-right" /></div></story>'

const withLocale: DecoratorFunction = (_, { globals }) => {
  Vue.prototype.$nuxt.$i18n.locale = globals.locale
  return {
    template
  }
}

const withTheme: DecoratorFunction = (_, { globals }) => {
  Vue.prototype.$nuxt.$colorMode.preference = globals.theme
  return {
    template
  }
}

export const decorators: DecoratorFunction[] = [withLocale, withTheme]

export const parameters = {
  controls: { expanded: true }
}
