const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
  // The path.resolve() method resolves a sequence of paths or path segments into an absolute path.
  // Local disk directory to store all your output files (Absolute path).
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/app.bundle.js',
    // Where you uploaded your bundled files. (Relative to server root)
    // publicPath: '/dist'
  },
  plugins: [
    new UglifyJSPlugin(),
    // Automatically load modules instead of having to import or require them everywhere.
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      Popper: 'popper.js'
    }),
    new ExtractTextPlugin('css/styles.css'),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  module: {
    rules: [
      /* babel-loader */
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['env']
          },
        }],
        exclude: /node_modules/
      },
      /* css-loader */
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      /* html-loader */
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      /* file-loader */
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: 'file-loader?name=img/[name].[ext]'
      }
    ]// rules
  }// module
};
