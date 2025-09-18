import { io } from "socket.io-client";

export const socket = io("https://quickchat-6vkt.onrender.com", {
  transports: ["websocket"],
});
