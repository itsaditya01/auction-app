const { getUser, addUser, getUsersInRoom, removeUser } = require("./Users");
const { generateMessage, generateBid } = require("./Message");
const http = require("http");
const { addBid } = require("../bidding/bidService");

const socketConnection = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });

  //socket events
  io.on("connection", (socket) => {
    console.log("New connection");

    //to create or join room
    socket.on("join", (options, callback) => {
      const { error, user } = addUser({ id: socket.id, ...options });
      if (error) {
        return callback(error);
      }
      socket.join(user.room);

      io.to(user.room).emit("getUsersInRoom", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });

      socket.emit("message", generateMessage("Admin", "Welcome!"));

      socket.broadcast
        .to(user.room)
        .emit(
          "message",
          generateMessage("Admin", `${user.username} has join the room`)
        );

      callback();
    });

    socket.on("sendBid", (bidAmount, callback) => {
      const user = getUser(socket.id);

      if (!user) {
        return callback("user is not registered");
      }

      socket.broadcast.to(user.room).emit("bid", generateBid(user.username, user.userId, bidAmount));
      callback();
    });

    socket.on("disconnect", () => {
      const user = removeUser(socket.id);

      if (user) {
        io.emit("message", generateMessage("Admin", `${user.username} left!`));
        socket.broadcast.to(user.room).emit("getUsersInRoom", {
          room: user.room,
          users: getUsersInRoom(user.room),
        });
      }
    });
  });
};

module.exports = socketConnection;
