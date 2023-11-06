import SocketIo from "socket.io";

export default class WebOpenAPI {
    public static inject(socket: SocketIo.Socket) {
        socket.on("ping", this.ping.bind(this, socket));
    }

    private static ping(socket: SocketIo.Socket) {
        console.log(`pinged by socket ${socket.id}, returning...`);
        socket.emit("message:console", "pong!");
    }
}
