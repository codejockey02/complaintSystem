const express = require('express');
var app = express(); //  used to define the routes
var randomstring = require('randomstring');
const register = require('./signup'); // including all the schemas and handlebars
const user = require('./userSchema');
const request = require('./reqSchema');
const admin = require('./admin');
const apply = require('./complaint');


const router = express.Router();

router.get('/', function (req, res) {
    res.render('homepage'); // to show a webpage after a response
});

router.get('/homepage', function (req, res) {
    res.render('homepage');
});

router.get('/signup', function (req, res) {
    res.render('signup');
})

router.get('/login', function (req, res) {
    res.render('login');
});

app.get('/about', function (req, res) {
    res.render('about');
});

router.get('/contact', function (req, res) {
    res.render('contact');
});

router.get('/pickacomplaint', (req, res) => {
    res.render('pickacomplaint');
});

router.get('/regcomplaint', (req, res) => {
    res.render('regcomplaint');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/complainthistory', (req, res) => {
    res.render('complainthistory');
});
router.get('/status', (req, res) => {
    res.render('status');
})

router.post('/status', (req, res) => {
    const email = req.body.email;
    console.log(email);
    request.find({
            email: email
        })
        .then(requests => {
            res.render('status', {
                requests: requests
            });
        });
});

router.get('/adminlogin', (req, res) => {
    res.render('admin_login');
});

router.get('/adminhome', (req, res) => {
    res.render('admin_home');
});

router.get('/staffs', (req, res) => {
    res.render('staffs');
});

router.get('/assigntask', (req, res) => {
    res.render('assign_task');
});

router.get('/info', (req, res) => {
    res.render('info');
});

router.get('/assign', (req, res) => {
    res.render('assign');
});

router.post('/adminhome', (req, res) => {
    request.find()
        .then(requests => {
            res.render('admin_home', {
                requests: requests
            });
        });
});

router.post('/assigntask', (req, res) => {
    request.find()
        .then(requests => {
            res.render('assign_task', {
                requests: requests
            });
        });
});

router.post('/admin', (req, res) => {
    const name = req.body.name;
    console.log(name);
    query = {
        "email": "anantmishra20@gmail.com"
    };
    update = {
        "$set": {
            "btn": name
        }
    };
    options = {
        "multi": true
    };
    admin.update(query, update, options, function (err) {
        if (err) return console.error(err);
    })
    res.redirect('/assign');
});

router.post('/assign', (req, res) => {
    async function getDetails() {
        const id = await admin
            .find()
            .select({
                btn: 1
            });
        console.log(id[0].btn);
        request.find({
                _id: id[0].btn
            })
            .then(requests => {
                console.log(requests);
                res.render('assign', {
                    requests: requests
                });
            });
    }
    getDetails();
});

router.post('/statuschange', (req, res) => {
    async function getDetails() {
        const id = await admin.find().select({
            btn: 1
        });
        query = {
            "_id": id[0].btn
        };
        update = {
            "$set": {
                "status": "Assigned"
            }
        };
        options = {
            "multi": true
        };
        request.update(query, update, options, function (err) {
            if (err) return console.error(err);
        })
    }
    getDetails();
    res.redirect('/adminhome');
});

router.post('/adminlogin', (req, res) => {
    const email = req.body.email;
    const password = req.body.pw;
    if (email == "anantmishra20@gmail.com" && password == "Anant@98") {
        res.redirect('/adminhome');
    } else {
        res.status(404).send("Admin Not Found");
    }
});

router.post('/signup', (req, res) => {
    const regno = req.body.regno;
    const name = req.body.name;
    const pwd = req.body.pwd;
    const gender = req.body.gender;
    const block = req.body.Block;
    const room = req.body.roomno;
    const phone = req.body.pno;
    const email = req.body.email;
    register.registerUser(regno, name, pwd, gender, block, room, phone, email)
        .then(result => {
            res.setHeader('Location', '/userSchema' + regno);
            res.status(result.status).json({
                message: result.message
            })
        })
        .catch(err => res.status(err.status).json({
            message: err.message
        }));
    res.redirect('/login');
});

//Authenticating the User
router.post('/login', (req, res) => {
    async function checking() {
        const credentials = req.body.email;
        console.log(credentials);
        cred = await user.findOne({
            email: credentials
        }, {
            email: 1,
            _id: 0
        });
        console.log(cred);
        if (cred == null) {
            res.status(401).send("Email id not FOUND !");
        } else if (cred.email == credentials) {
            const pwd = req.body.pw;
            veri = await user.findOne({
                email: credentials,
                password: pwd
            }, {
                password: 1,
                _id: 0
            });
            if (veri == null) {
                res.status(401).send("The Password entered is incorrect!")
            } else if (veri.password == pwd) {
                var key = randomstring.generate();
                query = {
                    "email": credentials
                };
                update = {
                    "$set": {
                        "token": key
                    }
                };
                options = {
                    "multi": true
                };

                user.update(query, update, options, function (err) {
                    if (err) return console.error(err);
                })
                res.redirect('/pickacomplaint');
            }
        }
    }
    checking();
});

router.post('/regcomplaint', (req, res) => {
    const email = req.body.email;
    const issue = req.body.issue;
    const desc = req.body.desc;
    const time = req.body.time;
    const ttime = req.body.ttime;
    async function retrieval() {
        var cred = await user.findOne({
            email: email
        }, {
            name: 1,
            reg: 1,
            room: 1,
            Block: 1,
            phone: 1,
            _id: 0
        });
        apply.registerReq(issue, desc, time, ttime, cred.name, cred.reg, cred.room, cred.Block, cred.phone, email)
            .then(result => {
                res.redirect('/pickacomplaint');
            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }));
    }
    retrieval();
});

module.exports = router;