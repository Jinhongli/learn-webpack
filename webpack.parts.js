const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.devServer = ({host, port} = {}) => ({
    devServer: {
        historyApiFallback: true,
        stats: 'errors-only',
        host,
        port,
        overlay: {
            errors: true,
            warnings: true
        }
    }
});

exports.lintJavaScript = ({include, exclude, options}) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                include,
                exclude,
                enforce: 'pre',
                loader: 'eslint-loader',
                options
            }
        ]
    }
});

exports.loadCSS = ({include, exclude} = {}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                include,
                exclude,
                use: ['style-loader', {loader: 'css-loader', options: {modules: true}}]
            }
        ]
    }
});

exports.extractCSS = ({include, exclude, use='css-loader'}) => {
    const plugin = new ExtractTextPlugin({
        filename: '[name].css'
    });

    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include,
                    exclude,
                    use: plugin.extract({
                        use,
                        fallback: 'style-loader'
                    })
                }
            ]
        },
        plugins: [plugin]
    };
};