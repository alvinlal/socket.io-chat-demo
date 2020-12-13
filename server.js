const express = require("express");
const app = express();
const socket = require("socket.io");
const PORT = process.env.PORT || 3000;

app.use(express.static("./public"));

const server = app.listen(PORT, () => console.log(`listening on port ${3000}`));
const io = socket(server);

var users = {}; //inmemory object to store currently online users

io.on("connection", socket => {
  console.log("new connection");
  socket.on("addUser", data => {
    users[data.username] = socket;
    console.log(`added user ${data.username} to user object`);
    console.log(`the online users is now ${Object.keys(users)}`);
  });
  socket.on("removeUser", data => {
    delete users[data.username];
    console.log(`removed user ${data.username} from user object`);
  });
  socket.on("newMessage", data => {
    console.log(`new message request from ${data.from} to ${data.to}`);
    console.log(`sending message to ${data.to}`);
    users[data.to].emit("newMessage", {
      // here, we can select our user from users object and send message to that user only
      from: data.from,
      message: data.message,
    });
    console.log(`finished sending message to ${data.to}`);
  });
  socket.on("disconnectUser", data => {
    delete users[data.username];
    console.log(`removed user ${data.username} from users object`);
    console.log(`the online users is now ${Object.keys(users)}`);
  });
});
