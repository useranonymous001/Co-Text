import debounce from "../utils/debounce.js";

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
const totalUsers = document.getElementById("total-users");
const totalRoomUsers = document.getElementById("room-users");
const roomNameHoder = document.getElementById("room-name");

// text-area
const textarea = document.getElementById("editor");

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
      roomNameHoder.innerText = `${editorRoomId}`;
    });

    joinRoom.addEventListener("click", (e) => {
      e.preventDefault();
      editorRoomId = editorRoom.value;
      // if (editorRoomId && editorRoomId == editorRoom.value) {
      //   return;
      // }
      console.log("Value from join button: ", editorRoomId);
      editorSocket.emit("join-editor-room", editorRoomId);
    });

    editorSocket.on("editor-room-joined", (joinedRoom) => {
      console.log("Joined room Object: ", joinedRoom);
      roomNameHoder.innerText = `${joinedRoom.roomID}`;
      editorSocket.emit("count-room-users", editorRoomId);
    });

    // count total number of users in room
    editorSocket.on("count-total-users", (totalOnlineUsers) => {
      totalUsers.innerText = `${totalOnlineUsers}`;
    });

    editorSocket.on("room-user-counted", (usersInsideRoom) => {
      totalRoomUsers.innerText = `${usersInsideRoom}`;
    });

    // events to handle text-change updates
    textarea.addEventListener(
      "input",
      debounce(() => {
        const content = textarea.value;
        editorSocket.emit("editor-text-change", content, editorRoomId);
      }),
      200
    );

    editorSocket.on("update-editor-text", (content) => {
      textarea.value = content;
    });

    // error handlers
    editorSocket.on("connect_error", (err) => {
      console.log(err);
    });
  }
}
