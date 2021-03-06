const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const glob = require('glob');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
    style: glob.sync('./app/**/*.css')
};

const commonConfig = merge([
    {
        entry: {
            app: PATHS.app,
            style: PATHS.style
        },
        output: {
            path: PATHS.build,
            filename: '[name].js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Webpack Demo'
            })
        ],
    },
    parts.lintJavaScript({include: PATHS.app}),
    parts.extractCSS({use: 'css-loader'}),
]);

const productionConfig = merge([]);

const developConfig = merge([
    parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT
    }),
    parts.loadCSS()
]);

module.exports = (env) => {
    if( env === 'production'){
        return merge(commonConfig, productionConfig);
    }
    return merge(commonConfig, developConfig);
};