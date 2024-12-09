// this is just a test file to test some function.

import crypto from "node:crypto";

const randomBytes = crypto.randomBytes(4);
console.log(randomBytes);
console.log(randomBytes.toString("base64"));
const encrypted = randomBytes.toString("base64");
// removing non-alphanumeric  characters and limit to 4
const randomText = encrypted.replace(/[^a-zA-Z0-9]/g, "");
console.log(randomText);
console.log(randomText.slice(0, 4));
