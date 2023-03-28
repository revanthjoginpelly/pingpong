let player_count = 0;

function listen(io) {
  io.on("connection", (socket) => {
    let room;
    //console.log(` USER connected  with ${socket.id}`);

    socket.on("ready", () => {
      room = "room" + Math.floor(player_count / 2);
      socket.join(room);

      console.log("connected id", socket.id, room);
      player_count++;

      if (player_count % 2 === 0) {
        io.in(room).emit("startGame", socket.id);
      }
    });
    socket.on("paddleMove", (paddleData) => {
      socket.to(room).emit("paddleMove", paddleData);
    });

    socket.on("ballMove", (ballData) => {
      socket.to(room).emit("ballMove", ballData);
    });

    socket.on("disconnect", (reason) => {
      console.log(
        `socked id ${socket.id} is disconnected with reson:${reason}`
      );
      socket.leave(room);
    });
  });
}

module.exports = {
  listen,
};
