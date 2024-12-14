import { generateTempRoomId } from "../utils/generateTempRoomId.js";

let totalUserOnline = 0;
let sharedText = "";
export const setUpDefaultNamespace = (io) => {
  // console.log("setting up default namespace....");
  const defaultNamespace = io;

  defaultNamespace.on("connection", (socket) => {
    // console.log("Client connected to default namespace", socket.id);
    socket.on("disconnect", () => {
      // console.log("Client disconnected", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.log(err);
    });

    // socket counter in a server
    totalUserOnline = io.engine.clientsCount;
    io.emit("client-count", totalUserOnline);

    socket.on("create-temp-room", () => {
      // console.log("create temp room event thrown");
      const tempRoomID = generateTempRoomId();
      socket.join(tempRoomID);
      socket.emit("temp-room-created", tempRoomID);
    });

    socket.on("join-temp-room", (tempRoomID) => {
      socket.join(tempRoomID);
      defaultNamespace.to(tempRoomID).emit("load-current-text", sharedText);
    });

    socket.on("temp-text-change", (text, tempRoomID) => {
      sharedText = text;
      socket.to(tempRoomID).emit("update-temp-text", sharedText);
    });
  });
};
