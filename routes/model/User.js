const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        validate: /^[a-zA-Z]*$/,

    },
    lastName: {
        type: String,
        validate: /^[a-zA-Z]*$/,
    },
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },

}, {
    timestamps: true
})


module.exports = mongoose.model("user", userSchema)