import { validateToken } from "../utils/token.js";

export function isAuthenticated(socket) {
  const token = socket.handshake.query.token;
  if (token) {
    try {
      const decoded = validateToken(token);
      return true;
    } catch (error) {
      return next(new Error("Authentication error: invalid token"));
    }
  }
  return false;
}
