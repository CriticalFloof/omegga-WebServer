const { webpack } = require("webpack");
const path = require("path");
const fs = require("fs");
const os = require("os");

module.exports = class Plugin {
    pluginInstance = null;

    constructor(omegga, config, store) {
        this.omegga = omegga;
        this.config = config;
        this.store = store;
    }

    async init() {
        const MAIN_FILE_TS = "plugin_entry.ts";
        const TS_BUILD_DIR = ".build";
        const TS_BUILD_FILE = "plugin.js";
        const pluginPath = path.resolve(__dirname);

        const tsBuildPath = path.join(pluginPath, TS_BUILD_DIR);
        const sourceFileName = path.join(pluginPath, "webui", MAIN_FILE_TS);
        // First thing to do is compile the plugin's typescript

        const stats = await new Promise((resolve, reject) => {
            webpack(
                Object.freeze({
                    target: "node",
                    context: __dirname,
                    mode: fs.existsSync(path.resolve(pluginPath, ".development")) ? "development" : "production",
                    entry: sourceFileName,
                    devtool: "source-map",
                    output: {
                        iife: false,
                        library: {
                            type: "commonjs",
                        },
                        path: tsBuildPath,
                        filename: TS_BUILD_FILE,
                    },
                    externals: [
                        function ({ request }, callback) {
                            if (request.match(/\.node$/)) {
                                return callback(null, "commonjs " + path.resolve(pluginPath, request));
                            }
                            callback();
                        },
                    ],
                    resolve: {
                        extensions: [".ts", ".js", ".json", ".node"],
                    },
                    cache: {
                        type: "filesystem",
                        cacheLocation: path.join(tsBuildPath, ".cache"),
                        allowCollectingMemory: false,
                        idleTimeout: 0,
                        idleTimeoutForInitialStore: 0,
                        // cache age is one week. plugins probably do not need
                        // to be rebuilt every day
                        maxAge: 1000 * 60 * 60 * 24 * 7,
                        profile: true,
                    },
                    module: {
                        rules: [
                            {
                                test: /\.[jt]s$/,
                                exclude: /(node_modules)/,
                                use: {
                                    loader: "swc-loader",
                                    options: {
                                        sourceMaps: true,
                                        cwd: pluginPath,
                                        isModule: true,
                                        jsc: {
                                            target: "es2020",
                                            parser: {
                                                syntax: "typescript",
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
                            {
                                test: /\.node$/,
                                exclude: /(node_modules)/,
                                use: {
                                    loader: "node-loader",
                                    options: {
                                        flags: os.constants.dlopen.RTLD_NOW,
                                    },
                                },
                            },
                        ],
                    },
                }),
                (err, stats) => (err ? reject(err) : resolve(stats))
            );
        });

        if (stats.compilation.errors.length > 0) {
            console.error("Plugin Failed to Transpile with reasons:");
            for (let i in stats.compilation.errors) {
                console.error(stats.compilation.errors[i]);
            }
        }

        const pluginClass = require("./.build/plugin").default;
        this.pluginInstance = new pluginClass(this.omegga, this.config, this.store);

        return this.pluginInstance.init();
    }

    async stop() {
        if (this.pluginInstance != null) {
            await this.pluginInstance.stop();
        }
        this.pluginInstance = null;
    }
};
