let io;

export const initializeSocket = (socketServer) => {
  io = socketServer;

  io.on("connection", (socket) => {
    console.log("🟢 User Connected:", socket.id);

    // Join a project's chat room
    socket.on("join-project", (projectId) => {
      socket.join(projectId);
      console.log(`📁 Joined project: ${projectId}`);
    });

    // Broadcast a message to everyone else in the same project
    socket.on("send-message", (message) => {
      socket
        .to(message.projectId)
        .emit("receive-message", message);
    });

    socket.on("disconnect", () => {
      console.log("🔴 User Disconnected:", socket.id);
    });
  });
};

export const getIO = () => io;