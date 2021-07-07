const path = require('path')

const webpackBase = require('../../webpack.base')

module.exports = (_env, argv) =>
  webpackBase({
    mode: argv.mode,
    entry: path.resolve(__dirname, 'src/index.ts'),
    filename: 'datadog-rum-react.js',
  })
