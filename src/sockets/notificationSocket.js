// handles all the room events here:

import {
  handleJoinRoom,
  handleSocketCount,
} from "../controllers/notificationsController.js";

/**
 * Handles the room/namespace join/leave events
 * @param {object} socket the socket instance
 * @param {object} io the socket.io server engine instance
 * @param {string} roomID the roomID/roomName
 *
 */

const roomHandlers = (io) => {
  io.on("connection", (socket) => {
    socket.on("join-room", async (roomID) => {
      // todo: random generate room name for avoioding conflicts
      handleJoinRoom(socket, roomID);
    });

    socket.on("fetch-socket-count", async (roomID) => {
      handleSocketCount(socket, io, roomID);
    });
  });
};

export { roomHandlers };
