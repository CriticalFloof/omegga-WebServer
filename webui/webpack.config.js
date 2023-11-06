const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
    mode: "development",
    entry: "./webui/src/frontend/source/app.js",
    output: {
        path: path.resolve(__dirname, "src/frontend/dist"),
        filename: "app.bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.s?css$/,
                use: ["vue-style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "file-loader",
            },
        ],
    },
    plugins: [new VueLoaderPlugin()],

    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src/frontend/source"),
            "@css": path.resolve(__dirname, "src/frontend/source/css"),
            "@components": path.resolve(__dirname, "src/frontend/source/components"),
            "@pages": path.resolve(__dirname, "src/frontend/source/pages"),
            "@assets": path.resolve(__dirname, "src/frontend/source/assets"),
        },
    },
};
