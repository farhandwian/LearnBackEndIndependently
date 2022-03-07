const express = require("express");
const { randomBytes } = require("crypto");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(cors());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "commentCreated") {
    const status = data.content.include("orange") ? "rejected" : "approved";
    //emit ke event bus data commentnya
    await axios.post("http://localhost:5000/events", {
      type: "commentModerated",
      data: {
        id: data.id,
        content: data.content,
        postId: data.postId,
        status,
      },
    });
  }
});

app.listen(5004, () => {
  console.log("moderation on port 5004");
});
