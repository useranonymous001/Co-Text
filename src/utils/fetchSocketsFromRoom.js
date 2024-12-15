const fetchSocketsFromRoom = async (io, roomID) => {
  const sockets = await io.of("/editor").to(roomID).fetchSockets();
  const socketCount = sockets.length;
  return socketCount;
};

export { fetchSocketsFromRoom };
