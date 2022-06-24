const { io } = require("socket.io-client");
const lib = require("./lib.json")
const socket = io(lib.controllerServerURL);


socket.on("connect", () => {
    console.log("connected");

    socket.on("logger2", msg => { // receiving messages which are sent from the central server
        console.log(msg) // logging the message
      })
})






