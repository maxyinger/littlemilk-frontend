const pxtoviewport = require('postcss-px-to-viewport')

module.exports = {
  plugins: [
    require('lost'),
    require('postcss-responsive-type'),
    pxtoviewport({
      viewportWidth     : 1440,
      viewportHeight    : 751,
      unitPrecision     : 3,
      viewportUnit      : 'vw',
      selectorBlackList : ['novw'],
      minPixelValue     : 1,
      mediaQuery        : false
    }),
    require('autoprefixer')
  ]
}
