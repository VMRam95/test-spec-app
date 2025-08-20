module.exports = {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
    ...(process.env.NODE_ENV === 'production'
      ? {
          'cssnano': {
            preset: ['default', {
              discardComments: {
                removeAll: true,
              },
              // Minimize duplicated tailwind classes
              mergeLonghand: true,
              // Minify CSS
              minifyFontValues: true,
              minifySelectors: true,
            }],
          },
        }
      : {})
  },
}