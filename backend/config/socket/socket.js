import { Server } from "socket.io";

// Initialize a Socket.io server
const socketServer = (server) => {
  const io = new Server(server);

  // Define event handlers
  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    // Handle disconnect event
    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};

export default socketServer;
