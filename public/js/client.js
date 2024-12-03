const socket = io(); // Connect to the backend server
import debounce from "./debounce.js";
const textArea = document.getElementById("text-area");
const userTypingIndicator = document.getElementById("typing");
const room = document.getElementById("room");
const joinRoomButton = document.getElementById("join-button");

// notify server about the text change
let roomID;

textArea.addEventListener(
  "input",
  debounce(() => {
    const text = textArea.value;
    socket.timeout(5000).emit("text-change", text, roomID);
  }, 200)
);

// updates the text are when the user changes the text field
socket.on("update-text", (text) => {
  textArea.value = text;
});

// send some event to show the current text to the new user.
socket.emit("initial-request", roomID);

// load the current text to the new user
socket.on("load-recent-text", (text) => {
  textArea.value = text;
});

// user is typing feature
const debounceStopTyping = debounce(() => {
  socket.emit("stopTyping", { user: socket.id }, roomID);
}, 1000);

textArea.addEventListener("input", () => {
  socket.emit("typing", { user: socket.id }, roomID);
  debounceStopTyping();
});

socket.on("userTyping", (data) => {
  userTypingIndicator.innerText = `${data.user} is typing....`;
});

socket.on("userStoppedTyping", (data) => {
  userTypingIndicator.innerText = data;
});

// user joining to a certain rooms

joinRoomButton.addEventListener("click", (e) => {
  e.preventDefault();
  roomID = room.value;
  socket.emit("join-room", roomID);
});
