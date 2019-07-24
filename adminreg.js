const admin = require('./admin');

const newUser = new admin({
    email: "iamgroot@gmail.com",
    password: "iamgroot",
    btn: "null"
});

newUser.save();