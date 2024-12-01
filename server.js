require("dotenv").config();
const http = require("node:http");
const app = require("./src/app.js");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("chat", (msg, callback) => {
    // socket.broadcast.emit("c hat", msg); // emits to everyone but not to itself
    // io.emit("chat", msg, msg2, msg3); // server emits msg to everyone including oneself
    // socket.emit("chat", msg); // send msg to myself only
    // acknowledgements
    console.log(msg);
    callback("got it");
  });
});

// SERVER LISTENING AT PORT 9999
const PORT = process.env.PORT || 9999;
server.listen(PORT, (req, res) => {
  console.log(`server listening at port ${PORT}`);
});
