const path = require("path");
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpackBaseConfig = require("./webpack.common.js");

module.exports = merge(webpackBaseConfig, {
  mode: "development",
  target: "web",
  output: {
    // publicPath: "/assets/",
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader", options: { importLoaders: 1 } },
          { loader: "postcss-loader" },
        ],
      },
    ],
  },
  devServer: {
    hot: true,
    overlay: true,
    contentBase: path.resolve(__dirname, "build"),
    index: "index.html",
    host: "localhost",
    port: 3000,
    open: true,
  },
  devtool: "eval-cheap-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
});
