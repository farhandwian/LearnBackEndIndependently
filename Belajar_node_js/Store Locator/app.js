const path = require("path");
const CORS = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const connectDB = require("./config/db.js");

// load env variables
dotenv.config({ path: "./config/config.env" });

const router = require("./router/router");

// Connect to database
connectDB();

// Body parser
app.use(express.json());

// Enable cors
app.use(CORS());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Make routes
app.use("/", router);

// connect to port
app.listen(process.env.PORT || 5000, () => {
  console.log("listening on port 3000");
});
