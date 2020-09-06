export default {
  title: 'Content/pre',
  decorators: [() => '<div class="nuxt-content"><div nuxt-content-highlight><story/></div></div>']
}

export const DEFAULT = () => ({
  template: '<pre class="line-numbers language-bash"><code>This is test pre \nexport default {}</code></pre>'
})
