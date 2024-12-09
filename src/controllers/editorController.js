// to-do: store the snaps of the text in the database

import { fetchSocketsFromRoom } from "../utils/fetchSocketsFromRoom.js";
import editor_model from "../models/editor_model.js";

let sharedText = ""; // will use db to store shared Text later on
let userInsideRoom = 0;

// editor room join handler
const handleJoinRoom = async (socket, roomID) => {
  // to-do: automatically update the current text present by previous users
  socket.join(roomID);
};

// edtior count in a room
const handleSocketCount = async (socket, editorNamespace, roomID) => {
  userInsideRoom = await fetchSocketsFromRoom(editorNamespace, roomID);
  editorNamespace
    .in(roomID)
    .emit("room-socket-count", { roomID, userInsideRoom });
};

const handleTextChange = (socket, editorNamespace, text, roomID) => {
  sharedText = text;
  socket.to(roomID).emit("update-text", sharedText);
};

// func to provide the existing text to the new user inside that room
const handleInitialRequest = (editorNamespace, roomID) => {
  editorNamespace.to(roomID).emit("load-recent-text", sharedText);
};

// user is typing
const handleUserTypingIndicator = (socket, data, roomID) => {
  socket.to(roomID).emit("userTyping", data);
};

const handleUserStopTyping = (socket, data, roomID) => {
  socket.to(roomID).emit("userStoppedTyping", "");
};

export {
  handleTextChange,
  handleInitialRequest,
  handleUserTypingIndicator,
  handleUserStopTyping,
  handleJoinRoom,
  handleSocketCount,
};
