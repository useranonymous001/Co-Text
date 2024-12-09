import { generateTempRoomId } from "../utils/generateTempRoomId.js";
let totalUserOnline = 0;
let sharedText = "";
const setUpDefaultNamespace = (io) => {
  io.on("connection", (socket) => {
    // socket counter in a server
    totalUserOnline = io.engine.clientsCount;
    io.emit("client-count", totalUserOnline);

    socket.on("create-temp-room", () => {
      const tempRoomID = generateTempRoomId();
      socket.join(tempRoomID);
      socket.emit("temp-room-created", tempRoomID);
    });

    socket.on("join-temp-room", (tempRoomID) => {
      socket.join(tempRoomID);
      io.to(tempRoomID).emit("load-current-text", sharedText);
    });

    socket.on("temp-text-change", (text, tempRoomID) => {
      sharedText = text;
      socket.to(tempRoomID).emit("update-temp-text", sharedText);
    });
  });
};

export { setUpDefaultNamespace };
