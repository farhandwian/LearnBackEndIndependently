//console.log("tes1");
let express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});
const { v4: uuidv4 } = require("uuid");

console.log("tes2");

// peer route
app.use("/peerjs", peerServer);

// set public folder
app.use(express.static("public"));

// set the view engine to ejs
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.redirect(`/${uuidv4()}`);
  console.log("tes33");
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
  console.log("tes44");
});

//console.log("tes3");

// io.on("connection", (socket) => {
//   console.log("tes55");
//   //buat room
//   socket.on("join-room", (roomId, userId) => {
//     //console.log("joined room");
//     socket.join(roomId);
//     socket.to(roomId).emit("user-connected", userId);
//     console.log("tes66");
//   });
// });

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    console.log("joined room");
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", userId);
  });
});

//console.log("tes4");

server.listen(process.env.PORT || 3030);
