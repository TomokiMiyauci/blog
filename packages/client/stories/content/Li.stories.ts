export default {
  title: 'Content/li',
  decorators: [() => '<div class="nuxt-content"><story/></div>']
}

export const DEFAULT = () => ({
  template: '<ul><li>This is the test li 1</li><li>This is the test li 2</li><li>This is the test li 3</li></ul>'
})
