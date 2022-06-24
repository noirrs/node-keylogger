const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);


app.get("/", (req, res) => {
  res.json({
    succes: true,
    message: "Hello World",
    port: process.env.PORT || 3000,
  });
});


io.on("connection", (socket) => {
  console.log("a client connected");
  console.log(process.env.PORT);

  socket.on("logger", (msg) => { // receiving messages from the client (python part of the project) 
    console.log(msg); // logging the message
    socket.broadcast.emit("logger2", msg); // sending messages to the other client which is probably our pc (controller)
  });
});

server.listen(process.env.PORT || 3000); // listening the port
/*
 if you are using Heroku, you should use just process.env.PORT
  Port:3000 is the default port for localhost
*/
