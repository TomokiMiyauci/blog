/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const { join } = require('path')
const BASE_DIR = join(__dirname, 'src')
const VUE_FILE = join('**', '*.vue')

/**
 * @type {import("src/types/tailwindcss").TailwindcssConfiguration}
 */
const config = {
  theme: {
    darkSelector: '.dark-mode',
    extend: {
      fontFamily: {
        sans: [
          'Quicksand',
          // ...defaultTheme.fontFamily.sans
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
        ]
      }
    }
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'focus-within'],
    boxShadow: ['responsive', 'hover', 'focus', 'focus-within'],
    textColor: ['responsive', 'hover', 'focus', 'focus-within']
  },
  plugins: [require('tailwindcss-dark-mode')()],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      join(BASE_DIR, 'components', VUE_FILE),
      join(BASE_DIR, 'layouts', VUE_FILE),
      join(BASE_DIR, 'pages', VUE_FILE),
      join(BASE_DIR, 'plugins', '**', '*.ts'),
      join(__dirname, 'nuxt.config.ts')
    ]
  }
}

module.exports = config
