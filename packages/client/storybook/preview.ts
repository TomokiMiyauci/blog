import '~~/.nuxt-storybook/storybook/preview.js'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en'
})

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

const withLocale = (_: any, { globals }: any) => {
  i18n.locale = globals.locale

  return {
    template: '<story />',
    i18n
  }
}

export const decorators = [withLocale]

export const parameters = {
  controls: { expanded: true }
}
