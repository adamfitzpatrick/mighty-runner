const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ResourceHintsWebpackPlugin = require('resource-hints-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const DefinePlugin = webpack.DefinePlugin
const yargs = require('yargs')

const { cdnResources, preload } = require(path.resolve(__dirname, 'template-resources'))
const logo = null

const mode = yargs.argv.p ? 'production' : 'development'
const environmentConfig = require(path.resolve(__dirname, 'environment'))[mode]

const hbsUse = [{ loader: 'handlebars-loader' }]
// if (mode === 'production') { hbsUse.push({ loader: 'prerender-loader' }) }

module.exports = {
  mode,
  entry: path.join(process.cwd(), 'src', 'index.tsx'),
  externals: {},
  output: {
    path: path.join(process.cwd(), 'build'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Mighty Runner',
      template: path.join(process.cwd(), 'src', 'index.template.hbs'),
      inject: 'body',
      cdnResources,
      logo,
      preload
    }),
    new ResourceHintsWebpackPlugin(),
    new BundleAnalyzerPlugin({ analyzerMode: mode === 'production' ? 'static' : 'disabled' }),
    new DefinePlugin({
      API_HOST: JSON.stringify(environmentConfig.API_HOST)
    })
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
      '@assets': path.resolve(process.cwd(), 'src/assets'),
      '@components': path.resolve(process.cwd(), 'src/components'),
      '@containers': path.resolve(process.cwd(), 'src/containers'),
      '@routes': path.resolve(process.cwd(), 'src/routes'),
      '@services': path.resolve(process.cwd(), 'src/services'),
      '@state': path.resolve(process.cwd(), 'src/state'),
      '@models': path.resolve(process.cwd(), 'models')
    }
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 7001,
    contentBase: path.join(process.cwd(), 'build'),
    compress: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    disableHostCheck: true
  }
}
