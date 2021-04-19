const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: [
      path.resolve(__dirname, "src", "main.js"),
      path.resolve(__dirname, "src", "css", "main.css"),
    ],
  },
  output: {
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      // enable imports of fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext][query]",
        },
      },
      // enable imports of images in js
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]",
        },
      },
      // es6 support
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "./src/template.html"),
      filename: "index.html",
      // favicon: "favicon.png",
    }),
  ],
};
