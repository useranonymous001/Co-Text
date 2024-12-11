// to-do: optimize that only the person inside the room can share at the realtime
// to-do: add authentication middleware for paid/aunthentic users
// to-do: you can write and share the code later on but should be inside the room for sharing

import { authenticateSocket } from "../middlewares/socketAuthMiddleware.js";

// import { validateToken } from "../utils/token.js";
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

  // authenticating before connecting
  editorNamespace.use(authenticateSocket);

  // socket connection
  editorNamespace.on("connection", (socket) => {
    // demo welcome message
    console.log("user connected to editor namespace");

    socket.on("disconnect", () => {
      console.log("editor socket disconnect");
    });
  });
};

export { setUpEditorSockethandlers };
