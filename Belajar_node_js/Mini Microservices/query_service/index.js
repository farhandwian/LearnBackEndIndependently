const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

const handleEvent = (type, data) => {
  if (type === "commentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  } else if (type === "postCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  } else if (type === "commentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;
    comment.content = content;
  }
};

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  console.log(posts);
  res.send({});
});

app.listen(5003, async () => {
  console.log("query service on port 5003");
  const res = await axios.get("http://localhost:5000/events");
  for (let event of res.data) {
    console.log("Processing event:", event.type);
    handleEvent(event.type, event.data);
  }
});
