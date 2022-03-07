const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(cors());

const events = [];

app.post("/events", async (req, res) => {
  const event = req.body;
  events.push(event);
  await axios.post("http://localhost:5001/events", event);
  await axios.post("http://localhost:5002/events", event);
  await axios.post("http://localhost:5003/events", event);
  await axios.post("http://localhost:5004/events", event);

  res.send({ status: "ok" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(5000, () => console.log("event bus on port 5000"));
