const usernames = ["alvin", "joyal", "jobal"];

const usernameHolder = document.getElementById("usernameholder");
const username = usernames[Math.floor(Math.random() * 3)]; // choosing a random username for demo purpose out of 3
document.title = username;
socket.emit("addUser", {
  username: username,
});
usernameHolder.textContent += username;

document.getElementById("sendbtn").addEventListener("click", sendMessage); //adding eventlistener to sendbutton , when it is clicked, we will send message to the server

function sendMessage() {
  const recipient = document.getElementById("recipient").value;
  if (!recipient) {
    alert("please enter recipients username");
    return; //if no username is provided , return from function
  }
  socket.emit("newMessage", {
    // sending message to server
    from: username,
    to: recipient,
    message: document.getElementById("message").value,
  });
}

window.addEventListener(
  "beforeunload",
  function () {
    socket.emit("disconnectUser", {
      username: username,
    });
  },
  false
);
