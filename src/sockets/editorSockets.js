// to-do: optimize that only the person inside the room can share at the realtime
// to-do: you can write and share the code later on but should be inside the room for sharing

import { validateToken } from "../utils/token.js";
import { generateTempRoomId } from "../utils/generateTempRoomId.js";

import {
  saveRoomID,
  handleJoinRoom,
  handleLeaveRoom,
  deleteEmptyRooms,
} from "../controllers/editorController.js";

/**
 * Handles the text change event
 * @param {Object} socket the socket instance
 * @param {object} io the SOCKET.io server instance
 * @param {object} editorNamespace instance of io with separate endpoints (namespace)
 * @param {string} text the new text to change
 * @param {string} roomID roomID for clients to join
 *
 */

let editorRoomId;
export const setUpEditorSockethandlers = (io) => {
  // new editor namespace for logged in users
  const editorNamespace = io.of("/editor");

  // socket authentication
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

  setInterval(() => {
    console.log("deleting empty rooms....");
    deleteEmptyRooms();
  }, 60000);

  // socket connection
  editorNamespace.on("connection", (socket) => {
    // just temp message, optimize it later
    console.log("user connected to editor namespace ", socket.id);

    socket.on("create-editor-room", async () => {
      editorRoomId = generateTempRoomId();
      socket.join(editorRoomId);
      // saving roomID in user's database
      const newRoom = await saveRoomID(editorRoomId, socket);
      socket.emit("editor-room-created", newRoom);
    });

    socket.on("join-editor-room", (roomID) => {
      handleJoinRoom(socket, roomID);
    });

    socket.on("disconnect", () => {
      console.log("pulling disconnected socket");
      handleLeaveRoom(socket, editorRoomId);
    });
  });
};
