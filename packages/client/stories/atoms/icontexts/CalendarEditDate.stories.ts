import { select } from '@storybook/addon-knobs'
import { addDecorator } from '@storybook/vue'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

const i18n = new VueI18n()

export default {
  title: 'CalendarEditDate'
}

addDecorator(() => ({
  template: '<story/>',
  i18n,
  props: {
    storybookLocale: {
      type: String,
      default: select('locale', ['en', 'ja'], 'en')
    }
  },
  watch: {
    storybookLocale: {
      handler(a: any) {
        i18n.locale = a
      },
      immediate: true
    }
  }
}))

i18n.locale = 'en'

export const DEFAULT = () => ({
  template: '<calendar-edit-date :text="text" label="label" />',
  props: {
    date: {
      default: new Date()
    },
    label: {
      default: select('hoge', ['hogehoge'], 'hogehoge')
    }
  }
})
