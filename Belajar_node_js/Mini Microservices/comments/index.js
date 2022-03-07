const express = require("express");
const { randomBytes } = require("crypto");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
const commentsByPostId = {};

app.get("/posts/:id/comments", async (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content, status: "pending" });

  commentsByPostId[req.params.id] = comments;

  //emit ke event bus data commentnya
  await axios.post("http://localhost:5000/events", {
    type: "commentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: "pending",
    },
  });
});

app.post("/events", async (req, res) => {
  console.log("Event Received", req.body.type);
  const { type, data } = req.body;
  if (type === "commentModerated") {
    const { postId, id, status } = data;
    const comments = commentBypostId[postId];
    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;

    //emit ke event bus data commentnya
    await axios.post("http://localhost:5000/events", {
      type: "commentUpdated",
      data: {
        id,
        content,
        postId,
        status,
      },
    });
  }
  res.send({});
});

app.listen(5002, () => {
  console.log("listening on port 5002");
});
