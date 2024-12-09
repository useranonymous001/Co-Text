import dotenv from "dotenv";
dotenv.config();
import http from "node:http";
import app from "./src/app.js";
const server = http.createServer(app);
import { Server } from "socket.io";

import connectDB from "./src/config/db_connection.js";
connectDB();

const io = new Server(server, {
  cors: {
    origin: `${process.env.CORS_ORIGIN}:${process.env.PORT}`,
    methods: ["GET", "POST"],
  },
});
import { setUpDefaultNamespace } from "./src/sockets/defaultSocket.js";
import { setUpEditorSockethandlers } from "./src/sockets/editorSockets.js";

// for default namespace
setUpDefaultNamespace(io);

// for editor namespace (loggedIN)
setUpEditorSockethandlers(io);

// SERVER LISTENING AT PORT 9999
const PORT = process.env.PORT || 9999;
server.listen(PORT, (req, res) => {
  console.log(`server listening at port ${PORT}`);
});
