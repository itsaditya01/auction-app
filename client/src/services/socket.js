import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  users: [],
  messages: [],
  bids: [],
  setUsers(userList) {
    this.users = userList;
  },
});

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production"
    ? undefined
    : "http://192.1.200.35:3022";

export const socket = io(URL, { autoConnect: false });

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("getUsersInRoom", ({ room, users }) => {
  state.users = users;
  console.log(state.users);
});

socket.on("message", (message) => {
  state.messages.push(message);
});
