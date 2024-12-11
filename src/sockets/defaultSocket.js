import { generateTempRoomId } from "../utils/generateTempRoomId.js";

const setUpDefaultNamespace = (io) => {
  let totalUserOnline = 0;
  let sharedText = "";
  console.log("setting up default namespace....");
  const defaultNamespace = io.of("/");

  defaultNamespace.on("connection", (socket) => {
    console.log("client connected ", socket.id);

    socket.on("connect", () => {
      console.log("User connected via 'connect' event", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.log(err);
    });

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
      defaultNamespace.to(tempRoomID).emit("load-current-text", sharedText);
    });

    socket.on("temp-text-change", (text, tempRoomID) => {
      sharedText = text;
      socket.to(tempRoomID).emit("update-temp-text", sharedText);
    });
  });
};

export { setUpDefaultNamespace };
