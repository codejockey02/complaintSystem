const mongoose = require('mongoose');
mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds233531.mlab.com:33531/vith')
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could Not Connect...", err));

const userData = mongoose.Schema({
    email: String,
    password: String,
    btn: String
});
mongoose.Promise = global.Promise;
module.exports = mongoose.model('admin', userData);