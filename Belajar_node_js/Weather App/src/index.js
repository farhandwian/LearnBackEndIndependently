const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

const weatherData = require("../utils/weatherData");

const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, "../templates/views");

const publicStaticDirPath = path.join(__dirname, "../public");

const partialsPath = path.join(__dirname, "../templates/partials");

// Static(public) and partial folder
app.use(express.static(publicStaticDirPath));

hbs.registerPartials(partialsPath);

// Setup View Engine
app.set("view engine", "hbs");

app.set("views", viewsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
  });
});

//localhost:3000/weather?address=lahore
app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You must enter address in search text box",
    });
  }
  weatherData(address, (err, { temperature, description, cityName }) => {
    if (err) {
      return res.send({
        error,
      });
    }
    console.log(temperature, description, cityName);
    res.send({
      temperature,
      description,
      cityName,
    });
  });
});

app.listen(port, () => {
  console.log("Server is up and running on port: ", port);
});
