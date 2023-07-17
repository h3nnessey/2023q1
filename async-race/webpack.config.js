const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const mode = process.env.NODE_ENV;

module.exports = {
  mode: mode,
  devtool: mode === 'development' ? 'inline-source-map' : false,
  entry: {
    main: path.resolve(__dirname, './src/index'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    assetModuleFilename: './assets/[name][ext]',
    clean: true,
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, './src'),
    },
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: 'ts-loader',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg|mp3)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    minimize: mode === 'production',
  },
};
