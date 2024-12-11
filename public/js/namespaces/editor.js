import debounce from "../utils/debounce.js";

// receiving accesstoken from the client storage (better to user httpOnly cookies)
const accessToken = localStorage.getItem("accessToken");

const editorSocket = io("/editor", {
  auth: {
    token: accessToken, // Sending the JWT token for authentication
  },
});

export function initializeEditorNamespace() {
  console.log("editor namespace function initialized");
  editorSocket.on("connect", () => {
    console.log("you have entered editor namespace");
  });

  editorSocket.on("disconnect", () => {
    console.log("editer socket disconnected");
  });
}
