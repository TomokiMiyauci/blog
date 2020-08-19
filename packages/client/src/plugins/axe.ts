import ja from 'axe-core/locales/ja.json'
import Vue from 'vue'

if (process.env.NODE_ENV === 'development') {
  import('vue-axe').then((module) => {
    Vue.use(module.default, {
      clearConsoleOnUpdate: false,
      config: { locale: ja }
    })
  })
}
