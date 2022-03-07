const socket = io("/");
//console.log("scrip.js");
// get html video-grid element
const videoGrid = document.getElementById("video-grid");
// create video element
const myVideo = document.createElement("video");
myVideo.muted = true;

var peer = new Peer(undefined, {
  path: "/peerjs",
  host: "/",
  port: "3030",
});

let myVideoStream;
navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
  console.log("S1");
  myVideoStream = stream;
  addVideoStream(myVideo, stream);

  peer.on("call", (call) => {
    console.log("S2");
    call.answer(stream);
    const video = document.createElement("video");
    call.on("stream", (userVideoStream) => {
      console.log("S3");
      addVideoStream(video, userVideoStream);
    });
  });

  socket.on("user-connected", (userId) => {
    console.log("S4");
    connectToNewUser(userId, stream);
  });
});

peer.on("open", (id) => {
  console.log("S5");
  socket.emit("join-room", ROOM_ID, id);
});

const connectToNewUser = (userId, stream) => {
  console.log("S6");
  const call = peer.call(userId, stream);
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    console.log("S7");
    addVideoStream(video, userVideoStream);
  });
};

//socket.emit("join-room", ROOM_ID);
// //console.log(ROOM_ID);

// socket.on("user-connected", (userId) => {
//   //console.log("newuser");
//   connectToNewUser(userId,stream);
// });

const addVideoStream = (video, stream) => {
  console.log("S8");
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
};
