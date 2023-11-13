const path = require("path");

let HtmlWebpackPlugin = require("html-webpack-plugin");
let HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: "./webui/src/frontend/source/index.html",
    filename: "index.html",
    inject: "body",
});

module.exports = {
    mode: "development",
    entry: "./webui/src/frontend/source/application.tsx",
    output: {
        path: path.resolve(__dirname, "src/frontend/dist"),
        filename: "app.bundle.js",
    },
    plugins: [HTMLWebpackPluginConfig],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localsConvention: "camelCase",
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "file-loader",
            },
            {
                test: /\.[jt]sx?$/,
                use: {
                    loader: "swc-loader",
                    options: {
                        sourceMaps: true,
                        isModule: true,
                        jsc: {
                            target: "es2020",
                            parser: {
                                syntax: "typescript",
                                tsx: true,
                            },
                            transform: {},
                        },

                        module: {
                            type: "commonjs",
                            strictMode: false,
                        },
                    },
                },
            },
        ],
    },
};
