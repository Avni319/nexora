import { io } from "socket.io-client";
import { API_BASE_URL } from "../config/env.js";

const socket = io(API_BASE_URL, {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("🟢 Socket Connected:", socket.id);
});

socket.on("connect_error", (err) => {
  console.log("🔴 Socket Error:", err.message);
});

socket.on("disconnect", () => {
  console.log("🔴 Socket Disconnected");
});

export default socket;