import SocketIo from "socket.io";
import Runtime from "../../main";
import { Plugin } from "omegga/dist/omegga/plugin";
import omeggaPackage from "omegga/package.json";
import child_process from "child_process";
import util from "util";
import { IPluginSummary } from "../../web_server_types";

export default class WebOpenAPI {
    public static inject(socket: SocketIo.Socket) {
        socket.on("ping", () => {
            this.ping(socket);
        });
        socket.on("plugins:list", () => {
            this.getPluginsList(socket);
        });
        socket.on("plugin:get", (searchItem, searchMethod) => {
            this.getPlugin(socket, searchItem, searchMethod);
        });
        socket.on("plugin:install", (author, name) => {
            this.installPlugin(socket, author, name);
        });
        socket.on("omegga:info", () => {
            this.omeggaInfo(socket);
        });
    }

    private static ping(socket: SocketIo.Socket) {
        console.log(`pinged by socket ${socket.id}, returning...`);
        socket.emit("message:console", "pong!");
    }

    private static getPluginsList(socket: SocketIo.Socket) {
        console.log("Getting Plugins...");
        const plugins: IPluginSummary[] = Runtime.omegga.pluginLoader.plugins.map((v) => ({
            name: v.getName(),
            documentation: v.getDocumentation(),
            path: v.shortPath,
            isLoaded: v.isLoaded(),
            isEnabled: v.isEnabled(),
        }));

        plugins.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

        socket.emit("plugins:list", plugins);
    }

    private static async getPlugin(socket: SocketIo.Socket, searchItem: string, searchMethod: "name" | "path" = "name") {
        console.log(`Getting Plugin '${searchItem}' using the '${searchMethod}' search method...`);

        let pluginResult: Plugin | undefined;

        switch (searchMethod) {
            case "name":
                pluginResult = Runtime.omegga.pluginLoader.plugins.find((p) => p.getName() === searchItem);
                break;
            case "path":
                pluginResult = Runtime.omegga.pluginLoader.plugins.find((p) => p.shortPath === searchItem);
                break;
        }

        let plugin;

        if (pluginResult) {
            const [defaultConfig, config, objCount] = await Promise.all([
                pluginResult.storage.getDefaultConfig(),
                pluginResult.storage.getConfig(),
                pluginResult.storage.count(),
            ]);

            plugin = {
                name: pluginResult.getName(),
                format: (pluginResult.constructor as typeof Plugin).getFormat(),
                info: pluginResult.getInfo(),
                documentation: pluginResult.getDocumentation(),
                config,
                defaultConfig,
                objCount,
                path: pluginResult.shortPath,
                isLoaded: pluginResult.isLoaded(),
                isEnabled: pluginResult.isEnabled(),
            };
        }

        socket.emit("plugin:get", plugin);
    }

    private static omeggaInfo(socket: SocketIo.Socket) {
        const info = {
            version: omeggaPackage.version,
        };

        socket.emit("omegga:info", info);
    }

    private static async installPlugin(socket: SocketIo.Socket, author: string, name: string) {
        if (Runtime.omegga.pluginLoader.plugins.find((p) => p.shortPath === name)) {
            socket.emit("plugin:install", false);
            return;
        }

        const promise_child_process = util.promisify(child_process.exec);
        let stdConsole = await promise_child_process(`omegga install gh:${author}/${name}`, { cwd: Runtime.omegga.path }).catch((err) => {
            console.error(err);
            socket.emit("plugin:install", false);
            return;
        });
        if (stdConsole) {
            console.log(stdConsole.stdout);
            console.log(stdConsole.stderr);
        }

        socket.emit("plugin:install", true);
    }
}
