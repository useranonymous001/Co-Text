import crypto from "node:crypto";

const generateTempRoomId = () => {
  const randomBytes = crypto.randomBytes(4).toString("base64");
  const randomRoomID = randomBytes.replace(/[^a-zA-Z0-9]/g, "").slice(0, 4);
  return randomRoomID;
};

export { generateTempRoomId };
