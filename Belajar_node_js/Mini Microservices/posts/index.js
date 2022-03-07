const express = require("express");
const { randomBytes } = require("crypto");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

// app.post("/posts", (req, res) => {
//   const id = randomBytes(4).toString("hex");
//   const { title } = req.body;

//   posts[id] = {
//     id,
//     title,
//   };

//   res.status(201).send(posts[id]);
// });

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios.post("http://localhost:5000/events", {
    type: "postCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Event Received", req.body.type);
  res.send({});
});

app.listen(5001, () => {
  console.log("post on port 5001");
});
