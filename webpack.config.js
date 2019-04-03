const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ResourceHintsWebpackPlugin = require('resource-hints-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const yargs = require('yargs')

const { cdnResources, preload } = require(path.resolve(__dirname, 'webpack-config', 'template-resources'))
const logo = null

const mode = yargs.argv.p ? 'production' : 'development'

const hbsUse = [{ loader: 'handlebars-loader' }]
// if (mode === 'production') { hbsUse.push({ loader: 'prerender-loader' }) }

if (yargs.argv['$0'].search('webpack-dev-server') !== -1) {
  require(path.resolve(process.cwd(), './mock-server/server'))
}

module.exports = {
  mode,
  entry: path.join(__dirname, 'src', 'index.tsx'),
  externals: {
    three: 'THREE',
    'simplex-noise': 'SimplexNoise'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Mighty Runner',
      template: path.join(__dirname, 'src', 'index.template.hbs'),
      inject: 'body',
      cdnResources,
      logo,
      preload
    }),
    new ResourceHintsWebpackPlugin(),
    new BundleAnalyzerPlugin({ analyzerMode: mode === 'production' ? 'static' : 'disabled' })
  ],
  module: {
    rules: [{
      test: /\.(ts|tsx)$/,
      use: [{
        loader: 'awesome-typescript-loader'
      }]
    }, {
      test: /\.hbs$/,
      use: hbsUse
    }, {
      include: /global\.scss/,
      use: [ 'style-loader', 'css-loader', 'sass-loader' ]
    }, {
      test: /\.scss$/,
      exclude: /global\.scss/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'typings-for-css-modules-loader',
        options: {
          modules: true,
          namedExport: true,
          localIdentName: '[name]__[local]--[hash:base64:5]'
        }
      }, {
        loader: 'sass-loader'
      }]
    }, {
      test: /\.(svg|jpg|png)$/,
      loader: 'url-loader',
      options: {
        limit: 8192
      }
    }, {
      test: /\.(otf|ttf|woff)$/,
      loader: 'file-loader'
    }]
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.jsx' ],
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@services': path.resolve(__dirname, 'src/services')
    }
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 7001,
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    disableHostCheck: true
  }
}
