// import { initializeDefaultNamespace } from "./namespaces/default.js";
// import { initializeEditorNamespace } from "./namespaces/editor.js";
// import { isLoggedIn } from "./utils/clientAuth.js";
// // for default namespace clients
// initializeDefaultNamespace();

// // for editor namespace

// if (isLoggedIn()) {
//   initializeEditorNamespace();
// } else {
//   initializeDefaultNamespace();
// }

const textArea = document.getElementById("text-area");
const room = document.getElementById("room");
const joinRoomButton = document.getElementById("join-button");
const online = document.getElementById("online-user");

const genDefaultRoom = document.getElementById("gen-temp-room-id");
const defaultRoomId = document.getElementById("room-id-placeholder");

// Default Namespace (no authentication)

import debounce from "./utils/debounce.js";

let tempRoomID;
// export function initializeDefaultNamespace() {
console.log("default client function initialized..");
const socket = io("http://localhost:1010", {
  transports: ["websocket", "polling"],
});
socket.on("connect", () => {
  // to-do: show some message when client joins
  console.log("connected to the rtc server ", socket.id);
});
socket.on("connect_error", (err) => {
  console.log(err);
  console.log(err.message);
  console.log(err.description);
  console.log(err.context);
});

// counting the number of client;
socket.on("client-count", (totalClients) => {
  online.innerText = `Online: 0`;
  online.innerText = `Online: ${totalClients}`;
});

// tell server to create a temp room

genDefaultRoom.addEventListener("click", (e) => {
  e.preventDefault();
  socket.emit("create-temp-room", (err) => {
    console.log("error creating room ", err.message);
  });
});

socket.on("temp-room-created", (roomID) => {
  tempRoomID = roomID;
  console.log(tempRoomID);
  defaultRoomId.innerText = roomID;
});

joinRoomButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (tempRoomID && room.value == tempRoomID) {
    return;
  }
  tempRoomID = room.value;
  socket.emit("join-temp-room", tempRoomID);
});

textArea.addEventListener(
  "input",
  debounce(() => {
    const text = textArea.value;
    socket.emit("temp-text-change", text, tempRoomID);
  }, 200)
);

socket.on("update-temp-text", (text) => {
  textArea.value = text;
});

socket.on("load-current-text", (sharedText) => {
  textArea.value = sharedText;
});

socket.on("disconnect", (reason) => {
  console.log("Disconnected from server:", reason);
});
// }

// Only connect to editor namespace when on the correct page or after login
// let editorSocket = null; // Don't create the connection on the home page

// if (window.location.pathname === "/editor") {
//   const token = getCookie("accessToken");

//   function getCookie(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(";").shift();
//     return "";
//   }

//   editorSocket = io("/editor", {
//     query: { token: token },
//   });

//   editorSocket.on("connect", () => {
//     console.log("Connected to the editor namespace");
//   });

//   editorSocket.on("connect_error", (err) => {
//     console.error("Connection error with editor namespace:", err);
//   });
// } else {
//   // No need to connect to editor namespace, only connect to default
//   initializeDefaultNamespace();
//   console.log("Not on editor page, no need to connect to /editor namespace.");
// }
