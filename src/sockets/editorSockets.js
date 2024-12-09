// to-do: optimize that only the person inside the room can share at the realtime
// to-do: add authentication middleware for paid/aunthentic users
// to-do: you can write and share the code later on but should be inside the room for sharing

import {
  handleTextChange,
  handleInitialRequest,
  handleUserStopTyping,
  handleUserTypingIndicator,
  handleJoinRoom,
  handleSocketCount,
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

const setUpEditorSockethandlers = (io) => {
  const editorNamespace = io.of("/editor");

  // to optimize it later
  // editorNamespace.use((socket, next) => {
  //   const token = socket.handshake.auth.token;
  //   if (isValidToken(token)) {
  //     socket.user = decodeToken(token);
  //     next();
  //   } else {
  //     next(new Error("unauthorized"));
  //   }
  // });

  editorNamespace.on("connection", (socket) => {
    // demo welcome message

    // room joining handlers
    socket.on("join-room", async (roomID) => {
      // todo: random generate room name for avoioding conflicts
      handleJoinRoom(socket, roomID);
    });
    // socket counter in a room
    socket.on("fetch-socket-count", async (roomID) => {
      handleSocketCount(socket, editorNamespace, roomID);
    });

    // user is typing indicator
    socket.on("text-change", (text, roomID) => {
      handleTextChange(socket, editorNamespace, text, roomID);
    });

    socket.on("initial-request", (roomID) => {
      handleInitialRequest(editorNamespace, roomID);
    });

    socket.on("typing", (data, roomID) => {
      handleUserTypingIndicator(socket, data, roomID);
    });

    socket.on("stopTyping", (data, roomID) => {
      handleUserStopTyping(socket, data, roomID);
    });
  });
};

export { setUpEditorSockethandlers };
