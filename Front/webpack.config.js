module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: "bundle.js",
        path: __dirname + '/../Back/public'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    context: __dirname,
    module: {
        rules: [
            {
                test: /jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        "@babel/preset-react",

                    ]
                }
            },
            {
                test: /.(css|sass|scss)$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },

                ],
            },
        ]
    },
    devtool: 'source-map'
}