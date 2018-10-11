const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:priyesh123@ds259732.mlab.com:59732/iwp-project')
    .then(()=> console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could Not Connect...",err));

const userData = mongoose.Schema({
    reg : String,
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
mongoose.Promise = global.Promise;
module.exports = mongoose.model('complaint', userData);