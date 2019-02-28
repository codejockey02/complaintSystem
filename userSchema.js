const mongoose = require('mongoose');

const userData = mongoose.Schema({
    reg: String,
    name: String,
    password: String,
    gender: String,
    Block: String,
    room: Number,
    phone: Number,
    email: String,
    token: String
});
module.exports = mongoose.model('user', userData);