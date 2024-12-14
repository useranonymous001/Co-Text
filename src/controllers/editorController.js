// to-do: store the snaps of the text in the database
import { fetchSocketsFromRoom } from "../utils/fetchSocketsFromRoom.js";
// import editor_model from "../models/editor_model.js";
import { getIO } from "../../server.js";
import { setUpEditorSockethandlers } from "../sockets/editorSockets.js";
import path from "path";

const __dirname = path.join("B:", "Projects", "Real-Time-Text-Collaboration");

let isEditorInitialized = false;

export const editorRouteHandler = (req, res, next) => {
  const io = getIO();

  if (!isEditorInitialized) {
    setUpEditorSockethandlers(io);
    // to-do: to remove the client from the server if he is loggedOut
    isEditorInitialized = true;
  }
  res.sendFile(path.join(__dirname, "public", "editor.html"));
};
