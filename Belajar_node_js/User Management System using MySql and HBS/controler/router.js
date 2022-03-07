var express = require("express");
var router = express.Router();
const mysql = require("mysql");

// Connection
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "user_management",
});

// home endpoint(munculin table)
router.get("/", (req, res) => {
  connection.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedUser = req.query.removed;
      res.render("home", { rows, removedUser });
    } else {
      console.log(err);
    }
  });
});

// new endpoint
router.get("/new", (req, res) => {
  res.render("new_page");
});

// add new data
router.post("/new", (req, res) => {
  const { firstName, lastName, email, phone, comments } = req.body;
  let sql = `INSERT INTO user SET first_name = ?,last_name = ?,email = ?, phone = ?,comments = ?`;
  let query = connection.query(sql, [firstName, lastName, email, phone, comments], function (error, results) {
    if (!error) {
      res.render("new_page", { alert: "User added succesfully" });
    } else {
      console.log(error);
    }
  });
});

// view one specific page(include find method)
router.get("/viewuser/:id", (req, res) => {
  connection.query("SELECT * FROM user WHERE id = ?", [req.params.id], (err, row) => {
    if (!err) {
      res.render("view_page", { row });
    } else {
      console.log(err);
    }
  });
});

// Get edit page
router.get("/edituser/:id", (req, res) => {
  connection.query("SELECT * FROM user WHERE id = ?", [req.params.id], (err, row) => {
    if (!err) {
      res.render("edit_page", { row });
    } else {
      console.log(err);
    }
  });
});

// Update data
router.post("/edituser/:id", (req, res) => {
  console.log(req.body + "ini body anjing");
  const { firstName, lastName, email, phone, comments } = req.body;
  let sql = "UPDATE user SET first_name = ?,last_name = ?,email = ?,phone = ?,comments = ? WHERE id = ?";
  connection.query(sql, [firstName, lastName, email, phone, comments, req.params.id], (err, result) => {
    if (!err) {
      connection.query("SELECT * FROM user WHERE id = ?", [req.params.id], (err, row) => {
        if (!err) {
          console.log(row);
          res.render("edit_page", { row, alert: `${firstName} has been updated` });
        } else {
          console.log(err);
        }
      });
      console.log(result.affectedRows + " record(s) updated");
    } else {
      console.log(err);
    }
  });
});

// find using search
router.post("/", (req, res) => {
  let searchTerm = req.body.search;
  connection.query("SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?", ["%" + searchTerm + "%", "%" + searchTerm + "%"], (err, rows) => {
    if (!err) {
      res.render("home", { rows });
    } else {
      console.log(err);
    }
  });
});

// Delete rows(or hide data from client but still saved in db)
router.get("/:id", (req, res) => {
  connection.query("UPDATE user SET status = ? WHERE id = ?", ["removed", req.params.id], (err, results) => {
    if (!err) {
      let removedUser = encodeURIComponent("User successeflly removed.");
      res.redirect("/?removed=" + removedUser);
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
