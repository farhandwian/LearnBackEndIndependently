const NodeGeocoder = require("node-geocoder");

const options = {
  // Optional depending on the providers
  provider: process.env.PROVIDER,
  httpAdapter: "https",
  apiKey: process.env.PROVIDER_KEY, // for Mapquest, OpenCage, Google Premier
  formatter: null, // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
