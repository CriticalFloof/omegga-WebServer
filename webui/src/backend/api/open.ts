import SocketIo from "socket.io";
import Runtime from "../../main";

export default class WebOpenAPI {
    public static inject(socket: SocketIo.Socket) {
        socket.on("ping", () => {
            this.ping(socket);
        });
        socket.on("pluginslist:get", () => {
            this.getPluginsList(socket);
        });
        socket.on("plugin:get", (searchItem, searchMethod) => {
            this.getPlugin(socket, searchItem, searchMethod);
        });
    }

    private static ping(socket: SocketIo.Socket) {
        console.log(`pinged by socket ${socket.id}, returning...`);
        socket.emit("message:console", "pong!");
    }

    private static getPluginsList(socket: SocketIo.Socket) {
        console.log("Getting Plugins...");
        const plugins = Runtime.omegga.pluginLoader.plugins.map((v) => ({
            name: v.getName(),
            documentation: v.getDocumentation(),
            path: v.shortPath,
            isLoaded: v.isLoaded(),
            isEnabled: v.isEnabled(),
        }));

        plugins.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

        socket.emit("pluginslist:get", plugins);
    }

    private static getPlugin(socket: SocketIo.Socket, searchItem: string, searchMethod: "name" | "path" = "name") {
        console.log(`Getting Plugin '${searchItem}' using the '${searchMethod}' search method...`);

        let pluginResult;

        switch (searchMethod) {
            case "name":
                pluginResult = Runtime.omegga.pluginLoader.plugins.find((p) => p.getName() === searchItem);
                break;
            case "path":
                pluginResult = Runtime.omegga.pluginLoader.plugins.find((p) => p.shortPath === searchItem);
                break;
        }

        let plugin = pluginResult
            ? {
                  name: pluginResult.getName(),
                  documentation: pluginResult.getDocumentation(),
                  path: pluginResult.shortPath,
                  isLoaded: pluginResult.isLoaded(),
                  isEnabled: pluginResult.isEnabled(),
              }
            : undefined;

        socket.emit("plugin:get", plugin);
    }
}
