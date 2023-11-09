import { Socket } from "socket.io-client";
import GlobalStore from "./global_store";

export default class ClientAPI {
    private store: GlobalStore;

    constructor(store: GlobalStore) {
        this.store = store;
    }

    public inject(socket: Socket) {
        socket.on("message:console", (message: string) => {
            this.messageConsole(message);
        });
        socket.on("pluginslist:get", (plugins_list: any) => {
            this.getPluginsList(plugins_list);
        });
    }

    private messageConsole(message: string) {
        console.log(message);
    }

    private getPluginsList(plugins_list: any) {
        this.store.set("pluginslist", plugins_list);
    }
}
