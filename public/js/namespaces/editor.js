// function to get the cookies from the browser
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return "";
}

// getting elements from the editor.html
const genRoom = document.getElementById("gen-room-id");
const roomIdHolder = document.getElementById("room-id-generated");
const joinRoom = document.getElementById("join-room");
const editorRoom = document.getElementById("room-id");

let editorSocket = null;
let editorRoomId;
export function initializeEditorNamespace() {
  const token = getCookie("accessToken");

  if (!editorSocket) {
    editorSocket = io("/editor", {
      auth: {
        query: token,
      },
    });

    editorSocket.on("connect", () => {
      console.log("connected to editor namespace");
    });

    genRoom.addEventListener("click", (e) => {
      e.preventDefault();
      editorSocket.emit("create-editor-room");
    });

    editorSocket.on("editor-room-created", (room) => {
      editorRoomId = room.roomID;
      roomIdHolder.innerText = `${editorRoomId}`;
    });

    joinRoom.addEventListener("click", (e) => {
      e.preventDefault();
      if (editorRoomId && editorRoomId == editorRoom.value) {
        return;
      }
      editorSocket.emit("join-editor-room", editorRoomId);
    });

    editorSocket.on("editor-room-joined", (joinedRoom) => {
      console.log("User Joined: ", joinedRoom);
    });

    // error handlers
    editorSocket.on("connect_error", (err) => {
      console.log(err);
    });
  }
}
