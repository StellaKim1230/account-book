const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const { DefinePlugin } = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const isDev = process.env.NODE_ENV === 'dev'

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: isDev ? 'inline-source-map' : false,
  output: {
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          'awesome-typescript-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname, 'configs/'),
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, 'src/styles')],
              data: '@import "./src/styles/_variables.scss";',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'bundle.[chunkHash].css',
      chunkFilename: 'bundle.[chunkHash].css',
    }),
    new OptimizeCssAssetsPlugin(),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'static'),
      to: path.resolve(__dirname, 'dist'),
      ignore: ['*.ejs'],
    }]),
    new DefinePlugin({
      DEV: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'static/index.ejs'),
      inject: true,
      title: 'Account-Book',
      chunksSortMode: 'dependency',
      hash: true,
    }),
    new CompressionPlugin({
      filename: '[file].gz[query]',
      algorithm: 'gzip',
    }),
    new Dotenv({
      path: './development.env'
    })
  ],
  optimization: {
    splitChunks: {
      automaticNameDelimiter: '~',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'vendor',
          enforce: true,
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  performance: {
    hints: false
  }
})