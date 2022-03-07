const express = require("express");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");
const router = require("./controler/router.js");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

//const viewsPath = path.join(__dirname, "views");

// Parsing middleware
// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); // New

// Parse application/json
// app.use(bodyParser.json());
app.use(express.json()); // New

// Setup View Engine
app.engine("hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", "hbs");

//app.set("views", viewsPath);

// // Data base configuration
// var pool = mysql.createPool({
//   connectionLimit: 10,
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "user_management",
// });

// //Connect to DB
// pool.getConnection(function (err, connection) {
//   if (err) throw err; // not connected!
//   console.log("Connected as ID" + connection.threadId);
// });

//routing
app.use("/", router);

app.listen(port, () => {
  console.log("listen on port 3000");
});
