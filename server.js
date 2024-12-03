import dotenv from "dotenv";
dotenv.config();
import http from "node:http";
import app from "./src/app.js";
const server = http.createServer(app);
import { Server } from "socket.io";

const io = new Server(server);

// storing the shared text in the memory
let sharedText = "";

io.on("connection", (socket) => {
  socket.on("text-change", (text, callback) => {
    sharedText = text;
    socket.broadcast.emit("update-text", sharedText);
    callback({
      from: socket.id,
      data: sharedText,
      buffer: Buffer.from([6]),
    });
  });

  socket.on("initial-request", () => {
    io.emit("load-recent-text", sharedText);
  });

  // user is typing indicator events
  socket.on("typing", (data) => {
    socket.broadcast.emit("userTyping", data);
  });

  socket.on("stopTyping", (data) => {
    socket.broadcast.emit("userStoppedTyping", "");
    console.log("user stopped typing", data.user);
    // can do some more features later when the user stops typing...
  });
});

// SERVER LISTENING AT PORT 9999
const PORT = process.env.PORT || 9999;
server.listen(PORT, (req, res) => {
  console.log(`server listening at port ${PORT}`);
});
