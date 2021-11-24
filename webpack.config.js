const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
var webpack = require("webpack");

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
    // "app.js": [path.resolve(__dirname, "src/app.js")],
    "app.js": {
      import: path.resolve(__dirname, "src/app.js"),
      dependOn: "jquery",
    },
    jquery: [path.resolve(__dirname, "vendor/jquery/jquery.min.js")],
  },
  output: {
    filename: "[name]",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      //   {
      //     test: /\.css$/,
      //     use: [
      //       {
      //         loader: "style-loader",
      //       },
      //       {
      //         loader: "css-loader",
      //         options: {
      //           sourceMap: true,
      //         },
      //       },
      //     ],
      //   },
      //   {
      //     test: /\.scss$/,
      //     use: [
      //       // fallback to style-loader in development
      //       process.env.NODE_ENV !== "production"
      //         ? "style-loader"
      //         : MiniCssExtractPlugin.loader,
      //       "css-loader",
      //       "sass-loader",
      //     ],
      //   },
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
  ],
  // devtool: this.mode === "development" ? "eval-source-map" : "eval",
  devtool: "source-map",
};
