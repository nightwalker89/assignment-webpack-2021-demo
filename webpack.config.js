
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: process.env.NODE_EVN === 'production' ? 'production' : 'development',
    entry: {
        'style.css': [
            path.resolve(__dirname, 'vendor/bootstrap/css/bootstrap.min.css'),
            path.resolve(__dirname, 'assets/css/fontawesome.css'),
            path.resolve(__dirname, 'assets/css/templatemo-seo-dream.css'),
            path.resolve(__dirname, 'assets/css/animated.css'),
            path.resolve(__dirname, 'assets/scss/owl.scss'),
        ],
        'app.js': [
            path.resolve(__dirname, 'src/app.js')
        ]
    },
    output: {
        filename: '[name]',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    // fallback to style-loader in development
                    process.env.NODE_ENV !== 'production'
                        ? 'style-loader'
                        : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
    devtool: this.mode === 'development' ? 'eval-source-map' : 'eval'
};