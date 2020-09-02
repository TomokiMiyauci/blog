const path = require('path')

module.exports = {
  webpackFinal(config: any, options: any) {
    config = options.nuxtStorybookConfig.webpackFinal(config, options)
    // extend config
    return config
  },
  stories: [path.join(__dirname, '..', 'stories', '**', '*.stories.@(ts|js)')],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: false
      }
    }
  ]
}
