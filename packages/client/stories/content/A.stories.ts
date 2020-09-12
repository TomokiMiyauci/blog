export default {
  title: 'Content/a',
  decorators: [() => '<div class="nuxt-content"><story/></div>']
}

export const DEFAULT = () => ({
  template: '<a href="https://tech-src.web.app">This is a test link</a>'
})
