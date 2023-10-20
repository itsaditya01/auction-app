


//socket connection to server
const server = http.createServer(app);
const io = socketio(server);

//socket events
io.on("connection", (socket) => {
  console.log("New connection");

  //to create or join room
  socket.on("join", (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options });
    console.log(error);
    console.log(user);
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

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    if (!user) {
      return callback("user is not registered");
    }

    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed.");
    }

    io.to(user.room).emit("message", generateMessage(user.username, message));
    callback();
  });

  socket.on("sendLocation", (position, ack) => {
    const user = getUser(socket.id);

    if (!user) {
      return ack("user is not registered");
    }

    socket.broadcast
      .to(user.room)
      .emit(
        "locationMessage",
        generateLocationMessage(
          user.username,
          `https://google.com/maps?q=${position.latitude},${position.longitude}`
        )
      );
    ack();
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
