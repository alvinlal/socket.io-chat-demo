const socket = io();

socket.on("newMessage", data => {
  alert(`new message from ${data.from}, the message is ${data.message}`);
});
