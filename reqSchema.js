const mongoose = require('mongoose');
mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds233531.mlab.com:33531/vith')
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could Not Connect...", err));

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
mongoose.Promise = global.Promise;
module.exports = mongoose.model('complaint', userData);