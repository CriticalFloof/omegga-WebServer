import path from "path";
import { Config, Storage } from "../plugin_entry";
import OmeggaWebServer from "./backend/web_server";

import child_process from "child_process";
import util from "util";
import { PluginConfig, PluginStore } from "omegga/dist/plugin";
import Omegga from "omegga/dist/omegga/server";

export default class Runtime {
    public static pluginPath: string;
    public static omegga: Omegga;
    public static config: PluginConfig<Config>;
    public static store: PluginStore<Storage>;
    public static omeggaWebServer: OmeggaWebServer;

    public static async main(omegga: Omegga, config: PluginConfig<Config>, store: PluginStore<Storage>): Promise<{ registeredCommands: string[] }> {
        [this.omegga, this.config, this.store] = [omegga, config, store];
        this.pluginPath = path.dirname(path.join(__filename, ".."));

        this.omeggaWebServer = new OmeggaWebServer(omegga);

        //For Automatically building the Frontend
        const promise_child_process = util.promisify(child_process.exec);
        await promise_child_process("npm run build-frontend", { cwd: this.pluginPath })
            .then(() => {
                console.log("\x1b[36m%s\x1b[0m", "Webpack Bundling Successful!");

                this.omeggaWebServer.on("started", () => {
                    console.log(`Omegga UI Listening on port ${this.omeggaWebServer.port}`);
                });

                this.omeggaWebServer.on("stopped", () => {
                    console.log(`Omegga UI Shutting down on port ${this.omeggaWebServer.port}`);
                });

                this.omeggaWebServer.start();
            })
            .catch((err) => {
                console.error(err);
                console.log("\x1b[41m%s\x1b[0m", "Webpack Bundling Not Successful...");
                console.log("Unloading Webserver Plugin.");
                const plugin = this.omegga.pluginLoader.plugins.find((p) => p.path === this.pluginPath);
                plugin!.unload();
            });

        return { registeredCommands: [] };
    }

    public static shutdown() {
        this.omeggaWebServer.stop();
    }
}
