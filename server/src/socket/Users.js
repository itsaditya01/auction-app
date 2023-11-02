const users = [];

const addUser = ({ id, userId, username, room }) => {
  console.log(username, room);
  //clean data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //validate the user
  if (!userId && !room) {
    return { error: "username and room are required." };
  }

  //check for existing user
  const existingUser = users.find((user) => {
    return user.userId === userId && user.room === room;
  });

  //validating user
  if (existingUser) {
    return {
      error: "User with this user id already exists.",
    };
  }
  //store user
  const user = { id, userId, username, room };
  users.push(user);
  console.log(users);
  return { user };
};

const removeUser = (id) => {
  //find index of user from given id
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  //find user by id
  return users.find((user) => user.id === id);
};

const getUsersInRoom = (room) => {
  return (roomUsers = users.filter((user) => user.room === room));
};

module.exports = { getUser, addUser, getUsersInRoom, removeUser };
