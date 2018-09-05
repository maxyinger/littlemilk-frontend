const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const project = require('../project.config')

const inProject = path.resolve.bind(path, project.basePath)
const inProjectSrc = file => inProject(project.srcDir, file)

const __DEV__ = project.env === 'development'
const __TEST__ = project.env === 'test'
const __PROD__ = project.env === 'production'

const config = {
  mode  : 'production',
  entry : {
    normalize : [inProjectSrc('utils/normalize')],
    main      : [inProjectSrc(project.main)]
  },
  devtool : project.sourcemap ? 'source-map' : false,
  output  : {
    path          : inProject(project.outDir),
    filename      : __DEV__ ? '[name].bundle.js' : '[name].bundle.[chunkhash].js',
    chunkFilename : __DEV__
      ? '[name].bundle.js'
      : '[name].bundle.[chunkhash].js',
    globalObject : 'this',
    publicPath   : project.publicPath
  },
  resolve: {
    modules    : [inProject(project.srcDir), 'node_modules'],
    extensions : ['*', '.js', '.jsx', '.json']
  },
  externals : project.externals,
  module    : {
    rules: []
  },
  plugins: [
    new webpack.DefinePlugin(
      Object.assign(
        {
          'process.env': { NODE_ENV: JSON.stringify(project.env) },
          __DEV__,
          __TEST__,
          __PROD__
        },
        project.globals
      )
    )
  ],
  optimization: {
    minimizer   : [],
    splitChunks : {}
  }
}

/* ==================================
=            JavaScript            =
================================== */
config.module.rules.push({
  test    : /\.(js|jsx)$/,
  exclude : /node_modules/,
  use     : {
    loader : 'babel-loader',
    query  : {
      cacheDirectory: true
    }
  }
})

config.module.rules.push({
  test : /\.worker\.js$/,
  use  : {
    loader  : 'worker-loader',
    options : { inline: true }
  }
})

/* ==============================
=            Styles            =
============================== */
const extractStyles = new MiniCssExtractPlugin({
  filename: __DEV__ ? '[name].bundle.css' : 'styles/[name].bundle.[hash].css'
})

config.module.rules.push({
  test : /\.(sa|sc|c)ss$/,
  use  : [
    __DEV__ ? 'style-loader' : MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader',
    'sass-loader'
  ]
})
config.plugins.push(extractStyles)

/* ============================
=            GLSL            =
============================ */
config.module.rules.push({
  test : /\.glsl$/,
  use  : ['webpack-glsl-loader']
})

/* ==============================
=            Images            =
============================== */
config.module.rules.push({
  test    : /\.(png|jpg|gif)$/,
  loader  : 'url-loader',
  options : {
    limit: 8192
  }
})

/* =============================
=            Fonts            =
============================= */
;[
  ['woff', 'application/font-woff'],
  ['woff2', 'application/font-woff2'],
  ['otf', 'font/opentype'],
  ['ttf', 'application/octet-stream'],
  ['eot', 'application/vnd.ms-fontobject'],
  ['svg', 'image/svg+xml']
].forEach(font => {
  const extension = font[0]
  const mimetype = font[1]

  config.module.rules.push({
    test    : new RegExp(`\\.${extension}$`),
    loader  : 'url-loader',
    options : {
      name  : 'fonts/[name].[ext]',
      limit : 10000,
      mimetype
    }
  })
})

/* =====================================
=            HTML Template            =
===================================== */
config.plugins.push(
  new HtmlWebpackPlugin({
    template : inProjectSrc('index.html'),
    inject   : true,
    minify   : {
      collapseWhitespace: true
    }
  })
)

/* =========================================
=            Development Tools            =
========================================= */
if (__DEV__) {
  config.mode = 'development'
  config.entry.main.push(
    `webpack-hot-middleware/client?path=${
      config.output.publicPath
    }__webpack_hmr`
  )
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  )
}

/* ========================================
=            Bundle Splitting            =
======================================== */
if (!__TEST__) {
  config.optimization.splitChunks = {
    cacheGroups: {
      commons: {
        test   : /[\\/]node_modules[\\/]/,
        name   : 'vendor',
        chunks : 'all'
      }
    }
  }
}

/* ================================================
=            Production Optimizations            =
================================================ */
if (__PROD__) {
  config.mode = 'production'
  config.optimization.minimizer.push(
    new UglifyJsPlugin({
      cache         : true,
      parallel      : true,
      sourceMap     : !!config.devtool,
      uglifyOptions : {
        warnings : false,
        ie8      : false,
        compress : {
          conditionals : true,
          unused       : true,
          comparisons  : true,
          sequences    : true,
          dead_code    : true,
          evaluate     : true,
          if_return    : true,
          join_vars    : true
        }
      }
    }),
    new OptimizeCssAssetsPlugin({})
  )
}

module.exports = config
