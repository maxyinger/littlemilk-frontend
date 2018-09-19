const pxtoviewport = require('postcss-px-to-viewport')

module.exports = {
  plugins: [
    require('lost'),
    require('postcss-responsive-type'),
    pxtoviewport({
      viewportWidth     : 2560,
      viewportHeight    : 1258,
      unitPrecision     : 3,
      viewportUnit      : 'vw',
      selectorBlackList : ['_px'],
      minPixelValue     : 1,
      mediaQuery        : false
    }),
    require('autoprefixer')
  ]
}
