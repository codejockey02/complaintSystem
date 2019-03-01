const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const env = require('./env');

env();

const app = express();
const exphbs = require('express-handlebars');
app.use(express.static('public')); // fetch all the static files/images fromm public folder
app.use(bodyParser.json({
    limit: '25mb',
}));
bodyParser.urlencoded({
    extended: true,
    limit: '25mb',
});
app.engine('handlebars', exphbs({
    helpers: {
        ifEquals: function (arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        }
    } // setting the extensi0on to be handlebars 
}));
app.set('view engine', 'handlebars');

const UserController = require('./server');

app.use('/', UserController);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL, {
    useMongoClient: true,
}).then(() => {
    process.stdout.write('Connected to mongodb');
}).catch((err) => {
    process.stderr.write(err.stack.toString());
});

app.listen(process.env.PORT);