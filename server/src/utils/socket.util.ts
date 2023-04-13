// io.ts

import { Server } from "socket.io";

let io: Server;

function initSocket(server: any): Server {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  return io;
}

function getIo() {
  if (!io) {
    throw new Error("Socket.io not initialized.");
  }
  return io;
}
export { initSocket, getIo };
