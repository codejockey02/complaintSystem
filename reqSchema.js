const mongoose = require('mongoose');

const userData = mongoose.Schema({
    reg: String,
    name: String,
    Block: String,
    room: Number,
    phone: Number,
    issue: String,
    desc: String,
    time: String,
    ttime: String,
    email: String,
    status: String,
    date: String
});

module.exports = mongoose.model('complaint', userData);