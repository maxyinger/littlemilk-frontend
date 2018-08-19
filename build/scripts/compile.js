const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const logger = require('../lib/logger')
const webpackConfig = require('../webpack.config')
const project = require('../../project.config')

const runWebpackCompiler = (webpackConfig) =>
  new Promise((resolve, reject) => { // eslint-disable no-new
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        logger.error('Webpack compiler encountered a fatal error', err.stack || err)
        if (err.details) {
          logger.error(err.details)
        }
        return reject(err.stack || err)
      }

      const jsonStats = stats.toJson()
      if (stats.hasErrors()) {
        logger.error('Webpack compiler encountered errors')
        logger.log(jsonStats.errors)
        return reject(new Error('Webpack compiler encountered errors.'))
      } else if (stats.hasWarnings()) {
        logger.warn('Webpack compiler encountered warnings')
        logger.log(jsonStats.warnings)
      }
      resolve(stats)
    })
  })

const compile = () => Promise.resolve()
  .then(() => logger.info('Starting compiler...'))
  .then(() => logger.info(`Targetapplication Environment: ${chalk.bold(project.env)}`))
  .then(() => runWebpackCompiler(webpackConfig))
  .then((stats) => {
    logger.info(`Copying static assets from ./public to ./${project.outDir}.`)
    fs.copySync(
      path.resolve(project.basePath, 'public'),
      path.resolve(project.basePath, project.outDir)
    )
    return stats
  })
  .then((stats) => {
    if (project.verbose) {
      logger.log(stats.toString({
        colors      : true,
        hash        : true,
        version     : true,
        timings     : true,
        entrypoints : false,
        builtAt     : false,
        modules     : false,
        children    : false
      }))
    }
    logger.success(`Compiler finished successfully! See ./${project.outDir}.`)
  })
  .catch((err) => logger.error('Compiler encountered errors.', err))

compile()
