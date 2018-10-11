const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:priyesh123@ds259732.mlab.com:59732/iwp-project')
    .then(()=> console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could Not Connect...",err));

const userData = mongoose.Schema({
    email: String,
    password: String,
    btn: String
});
mongoose.Promise = global.Promise;
module.exports = mongoose.model('admin', userData);
