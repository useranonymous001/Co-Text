import { initializeDefaultNamespace } from "./namespaces/default.js";

const textArea = document.getElementById("text-area");
const userTypingIndicator = document.getElementById("typing");
const room = document.getElementById("room");
const joinRoomButton = document.getElementById("join-button");
const online = document.getElementById("online-user");
const userInRoom = document.getElementById("inside-room");

// for default namespace clients
initializeDefaultNamespace();

// ======================================================================= //

// // temporary memory
// let roomID;
// const joinEditorNamespace = (roomID) => {
//   // to-do: need to implement authentication for editor namespace
//   if (!roomID) {
//     console.log("room id needed to connect with other");
//     return;
//   }
//   editorNamespace = io("/editor");
//   editorNamespace.emit("join-room", roomID);
//   editorNamespace.emit("fetch-socket-count", roomID);

//   // when user joins the room and enters the editor namespace
//   editorNamespace.on("connect", () => {
//     textArea.addEventListener(
//       "input",
//       debounce(() => {
//         const text = textArea.value;
//         editorNamespace.timeout(5000).emit("text-change", text, roomID);
//       }, 200)
//     );

//     // updates the text are when the user changes the text field
//     editorNamespace.on("update-text", (text) => {
//       textArea.value = text;
//     });

//     // send some event to show the current text to the new user.
//     editorNamespace.emit("initial-request", roomID);

//     // load the current text to the new user
//     editorNamespace.on("load-recent-text", (text) => {
//       textArea.value = text;
//     });

//     // user is typing feature
//     const debounceStopTyping = debounce(() => {
//       editorNamespace.emit("stopTyping", { user: socket.id }, roomID);
//     }, 1000);

//     textArea.addEventListener("input", () => {
//       editorNamespace.emit("typing", { user: socket.id }, roomID);
//       debounceStopTyping();
//     });

//     editorNamespace.on("userTyping", (data) => {
//       userTypingIndicator.innerText = `${data.user} is typing....`;
//     });

//     editorNamespace.on("userStoppedTyping", (data) => {
//       userTypingIndicator.innerText = data;
//     });

//     // ask for the users inside the rooms
//     editorNamespace.on("room-socket-count", ({ roomID, userInsideRoom }) => {
//       userInRoom.innerText = `ROOM: ${userInsideRoom}`;
//       userInRoom.innerText = `${roomID}: ${userInsideRoom}`;
//     });
//   });
// };

// user joining to a certain rooms
// joinRoomButton.addEventListener("click", (e) => {
//   e.preventDefault();
//   // preventing user from joining same room again and again
//   if (roomID && roomID == room.value) {
//     return;
//   }
//   roomID = room.value;
//   joinEditorNamespace(roomID);
// });
