const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if (isProd) {
        config.minimizer = [
            //new OptimizeCssAssetWebpackPlugin(),

            new TerserWebpackPlugin()
        ]
    }
    return config
}

module.exports = {
    entry: {
        //client: path.resolve(__dirname, 'src/client/js/game.js'),
        //server: path.resolve(__dirname, 'src/server/server.js'),
        // l2_2: path.resolve(__dirname, 'lab2/lab2_2.js'),
        l2_3: path.resolve(__dirname, 'lab2/index.js'),
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    experiments: {
        // executeModule: true,
        // outputModule: true,
        // syncWebAssembly: true,
        topLevelAwait: true,
        // asyncWebAssembly: true,
        // layers: true,
        // lazyCompilation: true,
      },
    optimization: optimization(),
    devServer: {
        // onBeforeSetupMiddleware: function (devServer) {
        //     if (!devServer) {
        //       throw new Error('webpack-dev-server is not defined');
        //     }
      
        //     devServer.app.get('/', function (req, res) {
        //     //   res.json({ custom: 'response' });
        //         res.sendFile(path.resolve(__dirname, './dist/lab2_3.html'))
        //     });
        // },
        // // open: ['/lab2_3.html'],
        // static: {
        //     directory: path.join(__dirname, 'lab2'),
        //   },
        compress: true,
        port: 3020
    },
    plugins: [
        // new HTMLWebpackPlugin({
        //     //template: path.resolve(__dirname, 'src/client/html/index.html')
        //     template: path.resolve(__dirname, 'lab2/lab2_2.html'),
        //     filename: "l2_2.html",
        //     path: path.resolve(__dirname, 'dist/'),
        //     chunks: ['l2_2']
        // }),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'lab2/index.html')
            // template: path.resolve(__dirname, 'lab2/index.html'),
            // filename: "index.html",
            // path: path.resolve(__dirname, 'dist/'),
            // chunks: ['l2_3']
        }),
        //new BundleAnalyzerPlugin(),
        new CleanWebpackPlugin(),
        // new CopyWebpackPlugin({
        //     patterns: [
                // { from: path.resolve(__dirname, 'client/favicon.ico'), to: path.resolve(__dirname, 'dist') },
                // { from: path.resolve(__dirname, 'client/android-chrome-192x192.png'), to: path.resolve(__dirname, 'dist') },
                // { from: path.resolve(__dirname, 'client/android-chrome-256x256.png'), to: path.resolve(__dirname, 'dist') },
                // { from: path.resolve(__dirname, 'client/apple-touch-icon.png'), to: path.resolve(__dirname, 'dist') },
                // { from: path.resolve(__dirname, 'client/browserconfig.xml'), to: path.resolve(__dirname, 'dist') },
                // { from: path.resolve(__dirname, 'client/favicon-16x16.png'), to: path.resolve(__dirname, 'dist') },
                // { from: path.resolve(__dirname, 'client/favicon-32x32.png'), to: path.resolve(__dirname, 'dist') },
                // { from: path.resolve(__dirname, 'client/mstile-150x150.png'), to: path.resolve(__dirname, 'dist') },
                // { from: path.resolve(__dirname, 'client/safari-pinned-tab.svg'), to: path.resolve(__dirname, 'dist') },
                // { from: path.resolve(__dirname, 'client/site.webmanifest'), to: path.resolve(__dirname, 'dist') },
                // { from: path.resolve(__dirname, 'client/images/'), to: path.resolve(__dirname, 'dist/images/') },
                // { from: path.resolve(__dirname, 'client/js/navMeshWorker.js'), to: path.resolve(__dirname, 'dist') },
                // { from: path.resolve(__dirname, 'client/js/recast.js'), to: path.resolve(__dirname, 'dist') },
                // { from: path.resolve(__dirname, 'client/gui1.json'), to: path.resolve(__dirname, 'dist') },
        //     ]
        // }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new NodePolyfillPlugin()
    ],
    resolve: {
        //extensions: [".js"],
        fallback: {
          "fs": false,
        },
    },
    module: {
        rules: [
            {

                test: /\.css$/,
                loader: MiniCssExtractPlugin.loader,
                options: {},
            },
            {
                test: /\.css$/,
                loader: "css-loader",
                options: {
                    url: false,
                },
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader'
            },
            {
                test: /\.(svg|gif|babylon|ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            }
        ]
    }
}