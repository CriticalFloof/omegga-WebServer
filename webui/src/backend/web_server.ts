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
    private readonly DIST_PATH = path.join(this.FRONTEND_PATH, "dist");

    constructor(omegga: OmeggaLike) {
        super();
        this.port = 8081;
        this.omegga = omegga;
    }

    public start() {
        this.app = express();

        this.app.use("/", express.static(this.DIST_PATH));
        this.app.use(async (req, res) => {
            res.sendFile(path.join(this.DIST_PATH, "index.html"));
        });

        this.server = http.createServer(this.app);

        this.io = new SocketIo.Server(this.server);
        this.io.sockets.on("connection", (socket) => {
            console.log(`Connection Established with id: ${socket.id}`);
            WebOpenAPI.inject(socket);
        });

        this.server.on("error", (e: { code: string; errno: number; syscall: string; address: string; port: number }) => {
            if (e.code === "EADDRINUSE") {
                console.error("\x1b[41m%s\x1b[0m", `Address ${this.port} is already in use!`);
                this.stop();
            }
        });

        this.server.listen(this.port, () => {
            this.emit("started");
        });
    }

    public stop() {
        if (this.server) {
            this.server.close();
            this.server.closeAllConnections();
            this.emit("stopped");
        }
    }
}
