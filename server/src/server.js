import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/database.js";
import http from "http";
import { Server } from "socket.io";
import { initializeSocket } from "./socket/socket.js";
import { getCorsOrigins } from "./config/corsOrigins.js";

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;
const HOST = "0.0.0.0";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: getCorsOrigins(),
    credentials: true,
  },
});

initializeSocket(io);

server.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
  connectDB();
});