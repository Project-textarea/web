const path = require("path");
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const FileManagerPlugin = require('filemanager-webpack-plugin');
const TerserJsPlugin = require('terser-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

module.exports = {
    devServer: {
        port: 8888,
        host: "localhost",
        https: false,
        open: true,
        proxy: {
            '/api': {
                target: 'https://api.textarea.xyz/',
                changeOrigin: true,
                pathRewrite: {
                    '/api': '/'
                }
            },
        },
    },
    publicPath: IS_PROD ? "" : "./",
    lintOnSave: false,
    runtimeCompiler: true,
    productionSourceMap: false,
    configureWebpack: config => {
        config.externals = {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'element-ui': 'ELEMENT'
        }
        const plugins = [];
        if (IS_PROD) {
            plugins.push(
                new TerserJsPlugin({
                    terserOptions: {
                        warnings: false,
                        output: {
                            comments: false
                        },
                        compress: {
                            drop_console: true,
                            drop_debugger: true,
                            pure_funcs: ['console.log']
                        }
                    },
                    sourceMap: false,
                    parallel: true
                }),
                new CompressionWebpackPlugin({
                    filename: "[path].gz[query]",
                    algorithm: "gzip",
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8
                }),
                new FileManagerPlugin({
                    onEnd: {
                        archive: [
                            {source: './dist', destination: './dist.zip'}
                        ],
                        delete: [
                            './dist'
                        ]
                    }
                })
            );
        }
        config.optimization = {
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 20000,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            // get the name. E.g. node_modules/packageName/not/this/part.js
                            // or node_modules/packageName
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                            // npm package names are URL-safe, but some servers don't like @ symbols
                            return `npm.${packageName.replace('@', '')}`
                        },
                    },
                },
            },
        }
        config.plugins = [...config.plugins, ...plugins];
    },
    pwa: {},
}
