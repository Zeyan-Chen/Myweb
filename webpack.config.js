const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('css/[name].css');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清除再重新 bundle

module.exports = {
    mode: process.env.NODE_ENV,
    context: path.resolve(__dirname, './src'), // 進入點
    entry: {
        index: './index.jsx'
    },
    output: {
        path: path.resolve(__dirname, './dist'), // 出口點
        filename: '[name].js'
    },
    module: {
        rules: [
            // {
            //     test: /\.(sass|scss)$/,
            //     use: extractCSS.extract([
            //         'style-loader',
            //         'css-loader',
            //         'postcss-loader',
            //         'sass-loader'
            //     ]),
            //     exclude: /node_modules/
            // },

            {
                test: /\.(sass|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],
                exclude: path.resolve('./node_modules')
            },
            {
                test: /.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['@babel/preset-react'] }
                }
            },
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['@babel/preset-env'] }
                }
            }
        ]
    },
    resolve: {
        // modules: [
        //     path.resolve('src'),
        //     path.resolve('src/scss'),
        //     path.resolve('src/js'),
        //     path.resolve('src/images'),
        //     path.resolve('src/assets'),
        //     path.resolve('node_modules'),
        //     path.resolve('src/components')
        // ],
        extensions: ['.jsx', '.js', '.scss']
    },
    plugins: [
        extractCSS,
        new CopyWebpackPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'practice webpack',
            filename: 'index.html',
            template: 'html/template.html',
            viewport: 'width=device-width, initial-scale=1.0',
            description: 'webpack通通給我開發起來',
            Keywords: 'webpack通通給我開發起來'
            // chunks: ['index']
        })
    ]
};
