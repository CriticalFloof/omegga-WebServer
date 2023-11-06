import express from "express";
import Runtime from "../main";
import http from "http";
import https from "https";
import { EventEmitter } from "stream";
import path from "path";
import { OmeggaLike } from "omegga/dist/plugin";
import SocketIo from "socket.io";
import WebOpenAPI from "./api/open";

export default class OmeggaWebServer extends EventEmitter {
    public port: number;
    public omegga: OmeggaLike;

    public app: express.Express;
    public server: http.Server | https.Server;
    public io: SocketIo.Server;

    private readonly FRONTEND_PATH = path.join(Runtime.pluginPath, "webui/src/frontend");

    constructor(omegga: OmeggaLike) {
        super();
        this.port = 8081;
        this.omegga = omegga;
    }

    public start() {
        //express setup
        this.app = express();

        this.app.use("/public", express.static(this.FRONTEND_PATH));
        this.app.use(async (req, res) => {
            res.sendFile(path.join(this.FRONTEND_PATH, "main.html"));
        });

        //then, take the express app and create an http server with it.
        this.server = http.createServer(this.app);

        //socket io setup
        this.io = new SocketIo.Server(this.server);
        this.io.sockets.on("connection", (socket) => {
            console.log(`Connection Established with id: ${socket.id}`);
            WebOpenAPI.inject(socket);
        });

        //Open the server
        this.server.listen(this.port, () => {
            this.emit("started");
        });
    }

    public stop() {
        this.server.close();
        this.server.closeAllConnections();
        this.emit("stopped");
    }
}
