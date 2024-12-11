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
    origin: `http://localhost:1010`,
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling"],
});

import { setUpDefaultNamespace } from "./src/sockets/defaultSocket.js";
import { setUpEditorSockethandlers } from "./src/sockets/editorSockets.js";
import { authenticateSocket } from "./src/middlewares/socketAuthMiddleware.js";
import { isAuthenticated } from "./src/middlewares/socketAuthMiddleware.js";

// for default namespace
// setUpDefaultNamespace(io);
// for editor namespace (loggedIN)

// setting up middlewares

io.use((socket, next) => {
  console.log("Middleware executed for socket:", socket.id);
  next(); // Allow all connections
});

setUpDefaultNamespace(io);

// io.use(async (socket, next) => {
//   const token = socket.handshake.query.token;
//   if (!token) {
//     console.log("default namespace executed");
//     setUpDefaultNamespace(io);
//   } else {
//     console.log("editor namespace executed");
//     setUpEditorSockethandlers(io);
//   }
// });

io.use((socket, next) => {
  next(new Error("some error occured here"));
});

// SERVER LISTENING AT PORT 9999
const PORT = process.env.PORT || 9999;
server.listen(PORT, (req, res) => {
  console.log(`server listening at port ${PORT}`);
});
