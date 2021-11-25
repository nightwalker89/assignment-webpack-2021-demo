const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: {
    app: [
      path.resolve(__dirname, "src/app.js"),
      path.resolve(__dirname, "assets/scss/style.scss"),
    ],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  optimization: {
    minimize: process.env.NODE_ENV === "production",
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
  // devtool: this.mode === "development" ? "eval-source-map" : "eval",
};
if (process.env.NODE_ENV === "development") {
  module.exports.devtool = "source-map";
}
