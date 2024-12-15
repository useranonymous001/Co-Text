// to-do: store the snaps of the text in the database
import { fetchSocketsFromRoom } from "../utils/fetchSocketsFromRoom.js";
import Room from "../models/room_model.js";
import { getIO } from "../../server.js";
import { setUpEditorSockethandlers } from "../sockets/editorSockets.js";
import path from "path";
import User from "../models/user_model.js";
import { saveDataToDatabase } from "../utils/saveContentToDatabase.js";

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

export async function saveRoomID(roomID, socket) {
  try {
    const user = await User.findById(socket.user.id);
    if (!user) {
      console.log("user not found");
      socket.disconnect();
    }

    const newRoom = await new Room({
      roomID,
      ownerID: user._id,
    });

    newRoom.activeUsers = newRoom.activeUsers.flat();
    console.log(newRoom.activeUsers);

    if (!newRoom.activeUsers.includes(socket.id)) {
      newRoom.activeUsers.push(socket.id);
    }
    await newRoom.save();
    return newRoom;
  } catch (error) {
    console.error("Error in saveRoomID: ", error.message);
    throw new Error("some error occured: ", error.message);
  }
}

export const handleJoinRoom = async (socket, roomIdToJoin) => {
  try {
    socket.join(roomIdToJoin);
    const joinedRoom = await Room.findOneAndUpdate(
      { roomID: roomIdToJoin },
      {
        $addToSet: { activeUsers: socket.id },
      },
      { new: true }
    );
    const io = getIO();
    io.of("/editor").emit("editor-room-joined", joinedRoom);
  } catch (error) {
    throw new Error("error occured when joining the room: ", error.message);
  }
};

export const handleLeaveRoom = async (socket, roomID) => {
  try {
    const joinedRoom = await Room.findOneAndUpdate(
      { roomID },
      { $pull: { activeUsers: socket.id } },
      { new: true }
    );
    return joinedRoom;
  } catch (error) {
    console.error("error in handleLeaveRoom: ", error.message);
    throw new Error("error occured while deleting user: ", error.message);
  }
};

export const deleteEmptyRooms = async () => {
  const rooms = await Room.find();

  const deletePromises = rooms
    .filter(
      (room) => Array.isArray(room.activeUsers) && room.activeUsers.length === 0
    )
    .map((room) => Room.findOneAndDelete({ _id: room._id }));

  await Promise.all(deletePromises);
};

export const countTotalRoomUsers = async (editorRoomId) => {
  const io = getIO();
  const totalRoomUsers = await fetchSocketsFromRoom(io, editorRoomId);

  return totalRoomUsers;
};

// main text-change events controller
export const handleTextChange = async (io, socket, content, editorRoomId) => {
  io.of("/editor").to(editorRoomId).emit("update-editor-text", content);
  saveDataToDatabase(socket, content);
};
