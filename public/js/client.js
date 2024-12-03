const socket = io(); // Connect to the backend server
const textArea = document.getElementById("text-area");
const userTypingIndicator = document.getElementById("typing");
import debounce from "./debounce.js";

// notify server about the text change
textArea.addEventListener(
  "input",
  debounce(() => {
    const text = textArea.value;
    socket.timeout(5000).emit("text-change", text, (err, response) => {
      if (err) {
        console.log("the server did not acknowledge the event");
      } else {
        console.log(
          `From: ${response.from}\n data: ${response.data}\n buffedData: ${response.buffer}`
        );
      }
    });
  }, 200)
);

// updates the text are when the user changes the text field
socket.on("update-text", (text) => {
  textArea.value = text;
});

// send some event to show the current text to the new user.
socket.emit("initial-request");

// load the current text to the new user
socket.on("load-recent-text", (text) => {
  textArea.value = text;
});

// user is typing feature

const debounceStopTyping = debounce(() => {
  socket.emit("stopTyping", { user: socket.id });
}, 1000);

textArea.addEventListener("input", () => {
  socket.emit("typing", { user: socket.id });
  debounceStopTyping();
});

socket.on("userTyping", (data) => {
  userTypingIndicator.innerText = `${data.user} is typing....`;
});

socket.on("userStoppedTyping", (data) => {
  userTypingIndicator.innerText = data;
});
