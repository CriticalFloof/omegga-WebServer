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

        //For Automatically building the Frontend
        const promise_child_process = util.promisify(child_process.exec);
        await promise_child_process("npm run build-frontend", { cwd: this.pluginPath }).catch((err) => {
            console.error(err);
        });

        this.omeggaWebServer = new OmeggaWebServer(omegga);

        this.omeggaWebServer.on("started", () => {
            console.log(`Omegga UI Listening on port ${this.omeggaWebServer.port}`);
        });

        this.omeggaWebServer.on("stopped", () => {
            console.log(`Omegga UI Shutting down on port ${this.omeggaWebServer.port}`);
        });

        this.omeggaWebServer.start();

        return { registeredCommands: [] };
    }

    public static shutdown() {
        this.omeggaWebServer.stop();
    }
}
