import { OmeggaPlugin, OmeggaLike, PluginConfig, PluginStore } from "omegga/dist/plugin";
import Runtime from "./src/main";

export type Config = { foo: string };
export type Storage = { bar: string };

export default class Plugin implements OmeggaPlugin<Config, Storage> {
    public omegga: OmeggaLike;
    public config: PluginConfig<Config>;
    public store: PluginStore<Storage>;

    constructor(omegga: OmeggaLike, config: PluginConfig<Config>, store: PluginStore<Storage>) {
        [this.omegga, this.config, this.store] = [omegga, config, store];
    }

    public async init(): Promise<{ registeredCommands: string[] }> {
        return await Runtime.main(this.omegga, this.config, this.store);
    }

    public async stop() {
        Runtime.shutdown();
    }
}
