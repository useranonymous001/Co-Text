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
  socket.on("text-change", (text, roomID) => {
    sharedText = text;
    socket.to(roomID).emit("update-text", sharedText);
  });

  socket.on("initial-request", (roomID) => {
    io.to(roomID).emit("load-recent-text", sharedText);
  });

  // user is typing indicator events
  socket.on("typing", (data, roomID) => {
    socket.to(roomID).emit("userTyping", data);
  });

  socket.on("stopTyping", (data, roomID) => {
    socket.to(roomID).emit("userStoppedTyping", "");
    console.log("user stopped typing", data.user);
    // can do some more features later when the user stops typing...
  });

  // making the users connect to the certain room
  socket.on("join-room", (room) => {
    socket.join(room);
  });
});

// SERVER LISTENING AT PORT 9999
const PORT = process.env.PORT || 9999;
server.listen(PORT, (req, res) => {
  console.log(`server listening at port ${PORT}`);
});
