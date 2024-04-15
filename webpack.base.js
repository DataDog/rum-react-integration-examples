const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const buildEnv = require('./scripts/build-env')

const tsconfigPath = path.join(__dirname, 'tsconfig.webpack.json')

module.exports = ({ entry, mode, filename, types }) => ({
  entry,
  mode,
  output: {
    filename,
    path: path.resolve('./bundle'),
  },
  target: ['web', 'es5'],
  devtool: mode === 'development' ? 'inline-source-map' : false,
  module: {
    rules: [
      {
        test: /\.(ts|js|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: tsconfigPath,
          onlyCompileBundledFiles: true,
          compilerOptions: {
            module: 'es6',
            allowJs: true,
            types: types || [],
          },
        },
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      // The default "pako.esm.js" build is not transpiled to es5
      pako: 'pako/dist/pako.es5.js',
      // By default, a non-bundled version of sinon is pulled in, which require the nodejs 'util'
      // module. Since v5, webpack doesn't provide nodejs polyfills. Use a bundled version of sinon
      // which have its own 'util' module polyfill.
      sinon: 'sinon/pkg/sinon.js',
    },
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },

  plugins: []
})
