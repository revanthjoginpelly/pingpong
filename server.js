const http = require("http");
const io = require("socket.io", {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const apiServer = require("./app");
const httpServer = http.createServer(apiServer);
const socketServer = io(httpServer);

const sockets = require("./sockets");

const PORT = 3000;
httpServer.listen(PORT);
console.log(`Listening on port ${PORT}...`);

sockets.listen(socketServer);

// const app = require("./app");
// const socket = require("./sockets");

// const server = require("http").createServer(app);
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// const port = 3000;

// server.listen(port);
// console.log(` listening on ${port}`);

// socket.listen(io);
