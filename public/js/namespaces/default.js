import debounce from "../utils/debounce.js";

const textArea = document.getElementById("text-area");
const room = document.getElementById("room");
const joinRoomButton = document.getElementById("join-button");
const online = document.getElementById("online-user");
const genDefaultRoom = document.getElementById("gen-temp-room-id");
const defaultRoomId = document.getElementById("room-id-placeholder");

const socket = io("http://localhost:1010");

let tempRoomID;
export function initializeDefaultNamespace() {
  // console.log("function initialized..");
  socket.on("connect", () => {
    // to-do: show some message when client joins
    console.log("connected to the rtc server");
  });
  socket.on("connect_error", (err) => {
    console.log(err.message);
    console.log(err.description);
    console.log(err.context);
  });

  // counting the number of client;

  socket.on("disconnect", (reason) => {
    console.log("disconnected client: ", reason);
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
}
