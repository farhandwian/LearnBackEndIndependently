const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");

const storeSchema = new mongoose.Schema({
  storeId: {
    type: String,
    required: [true, "Please add a store ID"],
    unique: true,
    trim: true,
    maxlength: [10, "Store ID must be less than 10 characters"],
  },
  address: {
    type: String,
    required: [true, "Please add a store address"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

storeSchema.pre("save", async function (next) {
  console.log("tes2");
  // Using callback
  const res = await geocoder.geocode(this.address);
  console.log("tes3");
  this.location = {
    type: "Point",
    coordinates: [res[0].longitude, res[1].latitude],
    formattedAddress: res[0].formattedAddress,
  };
  console.log("tes4");
  // Do not save address
  this.address = undefined;
  next();
});

module.exports = mongoose.model("store", storeSchema);
