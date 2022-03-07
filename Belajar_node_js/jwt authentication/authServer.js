require("dotenv");
const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");

let refreshTokens = [];

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.include(refreshToken)) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: data.name });
  });
});

app.post("/login", async (req, res) => {
  //generate acces token save ussername password
  try {
    const username = req.body.username;
    const user = { name: username };

    const accessToken = generateAccessToken();
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  } catch (e) {}
});

//app.get("/login", (req, res) => {});

//middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function generateAccessToken() {
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
  return token;
}

app.listen(3000);
