require('dotenv').config();

const PORT = process.env.PORT || 8989;
const HOST = process.env.HOST || 'localhost';

const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile(path.resolve("public/index.html"));
});

io.on("connection", (socket) => {
  const username = socket.handshake.query.username;
  console.log("User connected", username);

  socket.on("user", (message) => {
    io.emit("message", `${username}: ${message}`);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at: ${PORT}`);
});