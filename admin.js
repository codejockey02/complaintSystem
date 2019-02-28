const mongoose = require('mongoose');

const userData = mongoose.Schema({
    email: String,
    password: String,
    btn: String
});

module.exports = mongoose.model('admin', userData);