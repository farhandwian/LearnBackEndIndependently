const fetch = require("node-fetch");
const constants = require("../config");

// https://api.openweathermap.org/data/2.5/weather?q={city%20name}&appid={API%20key}

// const weatherData = (address, callback) => {
//   const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + "&appid=" + constants.openWeatherMap.SECRET_KEY;
// fetch({ url}).then(res=>res.json).then((err, { body }) => {
//   if (error) {
//     callback("Can't fetch data from open weather map api ", undefined);
//   } else if (!body.main || !body.main.temp || !body.name || !body.weather) {
//     callback("Unable to find required data, try another location", undefined);
//   } else {
//     callback(undefined, {
//       temperature: body.main.temp,
//       description: body.weather[0].description,
//       cityName: body.name,
//     });
//   }
// });

const weatherData = (address, callback) => {
  const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + "&appid=" + constants.openWeatherMap.SECRET_KEY;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (!data.main || !data.main.temp || !data.name || !data.weather) {
        callback("Unable to find required data, try another location", undefined);
      } else {
        callback(undefined, {
          temperature: data.main.temp,
          description: data.weather[0].description,
          cityName: data.name,
        });
      }
    })
    .catch((err) => {
      callback("Can't fetch data from open weather map api ", undefined);
    });
};

module.exports = weatherData;
