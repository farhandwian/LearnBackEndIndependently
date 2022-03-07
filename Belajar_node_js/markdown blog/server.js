const express = require("express");
const mongoose = require("mongoose");
const app = express();
let articleRouter = require("./routes/articles");
let Article = require("./models/article_model");
const methodOverride = require("method-override");

const uri = "mongodb+srv://ryan_azure:yoontae93@cluster0.eahvr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// Connect to database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// Set view engine
app.set("view engine", "ejs");

// Biar bisa ngambil data dari html make req.body
app.use(express.urlencoded({ extended: false }));

// Make methodOverride
app.use(methodOverride("_method"));

// Routing
app.use("/articles", articleRouter);

app.get("/", async (req, res) => {
  const articles = await Article.find({}).sort({ createdAt: "descending" });
  res.render("index", { articles: articles });
});

app.listen(3000);
