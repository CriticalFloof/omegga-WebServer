import { Socket } from "socket.io-client";

export default class ClientAPI {
    public static inject(socket: Socket) {
        socket.on("message:console", this.messageConsole);
    }

    private static messageConsole(message: string) {
        console.log(message);
    }
}
