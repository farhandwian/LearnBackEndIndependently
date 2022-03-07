const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

// Parsing middleware
// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); // New

// Parse application/json
// app.use(bodyParser.json());
app.use(express.json()); // New

//DB Connection(global variable)
require("./src/database/connection");

app.listen(port, () => {
  console.log("listen on port 3000");
});

//11.30

//28 20 yt,27 pomo
