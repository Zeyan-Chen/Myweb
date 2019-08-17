var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('css/[name].css');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    context: path.resolve(__dirname, './src'), // 進入點
    entry: './index.jsx',
    output: {
        path: path.resolve(__dirname, './dist'), // 出口點
        filename: 'index.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(sass|scss)$/,
                use: extractCSS.extract([
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]),
                exclude: /node_modules/
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
        new HtmlWebpackPlugin({
            title: 'practice webpack',
            filename: 'index.html',
            template: 'html/template.html',
            viewport: 'width=device-width, initial-scale=1.0',
            description: 'webpack通通給我開發起來',
            Keywords: 'webpack通通給我開發起來',
            chunks: ['index']
        })
    ]
};
