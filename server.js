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
    origin: `*`,
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling"],
});

import { setUpDefaultNamespace } from "./src/sockets/defaultSocket.js";

// SERVER LISTENING AT PORT 9999
const PORT = process.env.PORT || 9999;
server.listen(PORT, (req, res) => {
  console.log(`server listening at port ${PORT}`);
});

// for default namespace

setUpDefaultNamespace(io);

export function getIO() {
  if (!io) {
    console.log("IO function not initialized");
  }
  return io;
}
