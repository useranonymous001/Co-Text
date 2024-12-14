// to-do: store the snaps of the text in the database
import { fetchSocketsFromRoom } from "../utils/fetchSocketsFromRoom.js";
import Editor from "../models/editor_model.js";
import Room from "../models/room_model.js";
import { getIO } from "../../server.js";
import { setUpEditorSockethandlers } from "../sockets/editorSockets.js";
import path from "path";
import User from "../models/user_model.js";

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

    const newRoom = await Room.create({
      roomID,
      ownerID: user._id,
      activeUsers: [socket.id],
    });
    return newRoom;
  } catch (error) {
    console.error("Error in saveRoomID: ", error.message);
    throw new Error("some error occured: ", error.message);
  }
}

export const handleJoinRoom = async (socket, roomID) => {
  try {
    socket.join(roomID);
    const joinedRoom = await Room.findOneAndUpdate(
      { roomID: roomID },
      {
        $addToSet: { activeUsers: socket.id },
      },
      { new: true }
    );
    console.log(`${socket.id} joined ${roomID}`);
    socket.emit("editor-room-joined", joinedRoom);
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

  // for (const room of rooms) {
  //   const activeUsersLen = room.activeUsers.length;
  //   if (activeUsersLen === 0) {
  //     await Room.findOneAndDelete({ _id: room._id });
  //     console.log(`Deleted empty room with ID: ${room._id}`);
  //   }
  // }

  const deletePromises = rooms
    .filter((room) => room.activeUsers.length === 0)
    .map((room) => findOneAndDelete({ _id: room._id }));

  await Promise.all(deletePromises);
  console.log("all empty rooms are deleted");
};
