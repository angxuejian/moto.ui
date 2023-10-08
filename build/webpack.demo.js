const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('@nuxt/friendly-errors-webpack-plugin');
const portfinder = require('portfinder')
// const { merge } = require('webpack-merge')

const config = require('./config')
const isProd = process.env.NODE_ENV === 'production'
portfinder.basePort = config.port

const webpackConfig = {
  mode: process.env.NODE_ENV,
  entry: isProd ? {
    docs: './examples/entry.js'
  } : './examples/entry.js',
  output: {
    path: path.resolve(process.cwd(), './examples/moto-ui/'),
    publicPath: '',
    filename: '[name].[hash:7].js', // [模块名称].[模块标识符的哈希:哈希长度]
    chunkFilename: isProd ? '[name].[hash:7].js' : '[name].js'
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias,
    modules: ['node_modules']
  },

  devServer: {
    host: '0.0.0.0',
    port: config.port,
    publicPath: '/',
    hot: true,
    // open: `http://localhost:${config.port}`,
    disableHostCheck: true,
    stats: 'errors-only'
  },
  stats: "errors-only",
  performance: {
    hints: false
  },
  module: {
    rules: [{
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          isProd ? MiniCssExtractPlugin : 'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Moto UI',
      template: './examples/index.html',
      filename: './index.html',
      favicon: './examples/favicon.ico'
    }),
    new CopyWebpackPlugin([{
      from: 'examples/version.json'
    }]),
    new ProgressBarPlugin(),
    new VueLoaderPlugin()
  ],
  optimization: {
    minimizer: []
  },
  devtool: '#eval-source-map'
}



module.exports = new Promise(async (resolve, reject) => {
  const port = await portfinder.getPortPromise()
  config.port = port
  webpackConfig.devServer.port = port
  webpackConfig.plugins.push(new FriendlyErrorsWebpackPlugin({
    compilationSuccessInfo: {
      messages: [
        ` App runing at:`,
        ` - Local:   \x1B[33m http://localhost:${port}\x1B[0m`,
        ` - Network: \x1B[33m http://${require('ip').address()}:${port}\x1B[0m`,
        `  `
      ],
    }
  }))
  resolve(webpackConfig)
})