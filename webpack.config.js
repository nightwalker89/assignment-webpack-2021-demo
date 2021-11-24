const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');

module.exports = {
  mode: process.env.NODE_EVN === "production" ? "production" : "development",
  entry: {
    style: [
      path.resolve(__dirname, "vendor/bootstrap/css/bootstrap.min.css"),
      path.resolve(__dirname, "assets/css/fontawesome.css"),
      path.resolve(__dirname, "assets/css/templatemo-seo-dream.css"),
      path.resolve(__dirname, "assets/css/animated.css"),
      path.resolve(__dirname, "assets/scss/owl.scss"),
    ],
  },
  output: {
    filename: "[name]",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new MergeIntoSingleFilePlugin({
      files: {
        "app.js": [
          path.resolve(__dirname, "vendor/jquery/jquery.js"),
          path.resolve(__dirname, "vendor/bootstrap/js/bootstrap.bundle.min.js"),
          path.resolve(__dirname, "assets/js/owl-carousel.js"),
          path.resolve(__dirname, "assets/js/animation.js"),
          path.resolve(__dirname, "assets/js/imagesloaded.js"),
          path.resolve(__dirname, "assets/js/custom.js"),
        ]
      },
      transform: {
        'app.js': code => require("uglify-js").minify(code, {
          sourceMap: process.env.NODE_EVN === "development"
        }).code
      }
    }),
  ],
  // devtool: this.mode === "development" ? "eval-source-map" : "eval",
  devtool: "source-map",
};
