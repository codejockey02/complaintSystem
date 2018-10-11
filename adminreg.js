const admin = require('./admin');

const newUser = new admin({ 
    email: "anantmishra20@gmail.com",
    password: "Anant@98",
    btn: "null"
});

newUser.save();