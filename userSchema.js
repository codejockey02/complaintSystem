const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin123@ds233531.mlab.com:33531/vith')
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could Not Connect...", err));

const userData = mongoose.Schema({
    reg: String,
    name: String,
    password: String,
    gender: String,
    phone: Number,
    email: String,
});
module.exports = mongoose.model('user', userData);