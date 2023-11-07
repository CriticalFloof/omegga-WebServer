import { OmeggaPlugin, PluginConfig, PluginStore } from "omegga/dist/plugin";
import Omegga from "omegga/dist/omegga/server";
import Runtime from "./src/main";

export type Config = { foo: string };
export type Storage = { bar: string };

export default class Plugin implements OmeggaPlugin<Config, Storage> {
    public omegga: Omegga;
    public config: PluginConfig<Config>;
    public store: PluginStore<Storage>;

    constructor(omegga: Omegga, config: PluginConfig<Config>, store: PluginStore<Storage>) {
        [this.omegga, this.config, this.store] = [omegga, config, store];
    }

    public async init(): Promise<{ registeredCommands: string[] }> {
        return await Runtime.main(this.omegga, this.config, this.store);
    }

    public async stop() {
        Runtime.shutdown();
    }
}
