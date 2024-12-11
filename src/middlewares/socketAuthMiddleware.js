import { validateToken } from "../utils/token.js";

export function authenticateSocket(socket, next) {
  const token = socket.handshake.query.token;
  console.log(token);
  if (!token) {
    return next(new Error("token not found"));
  }
  try {
    const decoded = validateToken(token);
    socket.user = decoded;
    next();
  } catch (error) {
    return next(new Error("Authentication error: invalid token"));
  }
}

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
