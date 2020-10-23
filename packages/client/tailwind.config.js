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
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  theme: {
    darkSelector: '.dark-mode',
    extend: {
      fontFamily: {
        sans: [
          'Quicksand',
          // ...defaultTheme.fontFamily.sans
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
        ]
      },
      gridTemplateColumns: {
        main: 'minmax(20%,340px) 1fr min(15%,200px)'
      },
      inset: {
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        '11/12': '91.666667%',
        full: '100%'
      },

      spacing: {
        72: '18rem',
        84: '21rem',
        96: '24rem',
        108: '27rem',
        120: '30rem',
        132: '33rem',
        144: '36rem',
        156: '39rem',
        168: '42rem',
        180: '45rem',
        192: '48rem',

        '56px': '56px'
      },

      opacity: {
        90: '0.9',
        95: '0.95'
      }
    }
  },
  variants: {
    backgroundColor: [
      'responsive',
      'hover',
      'focus',
      'disabled',
      'focus-within',
      'dark',
      'dark-hover',
      'dark-focus',
      'dark-focus-within',
      'dark-disabled'
    ],
    boxShadow: ['responsive', 'hover', 'focus', 'focus-within', 'dark', 'dark-hover', 'dark-focus-within'],
    textColor: [
      'responsive',
      'hover',
      'focus',
      'disabled',
      'focus-within',
      'dark',
      'dark-hover',
      'dark-focus',
      'dark-focus-within',
      'dark-disabled'
    ],
    borderColor: [
      'responsive',
      'hover',
      'focus',
      'disabled',
      'focus-within',
      'dark',
      'dark-hover',
      'dark-focus',
      'dark-focus-within'
    ],
    gradientColorStops: ['responsive', 'hover', 'focus', 'dark'],
    cursor: ['responsive', 'disabled']
  },
  plugins: [
    require('tailwindcss-dark-mode')(),
    require('tailwind-bootstrap-grid')({
      gridGutterWidth: 0
    })
  ],
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
