const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber:String,
    email : String
  });

const model = mongoose.model('User',userSchema);

module.exports = model;