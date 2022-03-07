const mongoose = require('mongoose')

const userShcema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    hash: {
        type: String, 
        required: true
    },
    salt: {
        type: String,
        required: true
    },
     admin: {
         type: Boolean,
         required: true
     }
})

module.exports = mongoose.model('user', userShcema)