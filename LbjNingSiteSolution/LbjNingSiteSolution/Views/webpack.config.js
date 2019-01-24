const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
require("babel-core/register");
require("babel-polyfill");
var webpack = require('webpack')
//const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
    entry: ['babel-polyfill', './src/main.js'],
    mode: 'production',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../scripts/dist')
    },
    resolve: {
        alias: { //必须有的
            'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            // {
            //     test: /\.(png|svg|jpg|gif)$/,
            //     use: [
            //         'file-loader'
            //     ]
            // },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/
            },
            {    //url与file一般只能用其一
                test: /\.(woff2?|woff|eot|svg|ttf|otf|jpe?g|png|gif)(\?.*)?$/,
	            use:
                [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 20000,
                            publicPath:'../'
                        }
                    }
					//{ loader: "file-loader" }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"' //production
            }
        }),
        //new CleanWebpackPlugin(['dist']),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    performance: { //文件大小受限警告

        hints: "warning", // 枚举

        maxAssetSize: 200000, // 整数类型（以字节为单位）

        maxEntrypointSize: 300000, // 整数类型（以字节为单位）

        assetFilter: function (assetFilename) {

            // 提供资源文件名的断言函数  assetFilename.endsWith('.css') || assetFilename.endsWith('.js') || assetFilename.endsWith('.svg')
            return assetFilename.endsWith('.woff') || assetFilename.endsWith('.eot') || assetFilename.endsWith('.ttf');

        }

    }
}
console.log(config.output.path);
module.exports = config;