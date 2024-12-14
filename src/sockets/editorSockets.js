// to-do: optimize that only the person inside the room can share at the realtime
// to-do: add authentication middleware for paid/aunthentic users
// to-do: you can write and share the code later on but should be inside the room for sharing

import { validateToken } from "../utils/token.js";
import { generateTempRoomId } from "../utils/generateTempRoomId.js";
/**
 * Handles the text change event
 * @param {Object} socket the socket instance
 * @param {object} io the SOCKET.io server instance
 * @param {object} editorNamespace instance of io with separate endpoints (namespace)
 * @param {string} text the new text to change
 * @param {string} roomID roomID for clients to join
 *
 */

export const setUpEditorSockethandlers = (io) => {
  const editorNamespace = io.of("/editor");
  // authenticating before connecting
  editorNamespace.use((socket, next) => {
    const token = socket.handshake.auth.query;

    if (!token) {
      return next(new Error("token not found, send me the  token"));
    }
    try {
      const decoded = validateToken(token);
      socket.user = decoded;
      next();
    } catch (error) {
      return next(new Error("Authentication error: invalid token"));
    }
  });

  // socket connection
  editorNamespace.on("connection", (socket) => {
    // demo welcome message
    console.log("user connected to editor namespace ", socket.id);

    socket.on("create-editor-room", () => {
      const editorRoomId = generateTempRoomId();
      socket.join(editorRoomId);
      socket.emit("editor-room-created", editorRoomId);
    });

    socket.on("join-editor-room", (roomID) => {
      socket.join(roomID);
      socket.emit("editor-room-joined", "editor socket joined room");
    });

    socket.on("disconnect", (reason) => {
      console.log("editor socket disconnected reason: ", reason);
    });
  });
};
