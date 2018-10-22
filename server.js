const express = require('express');
var app = express();  //  used to define the routes
const bodyParser = require('body-parser');   // for parsing the json from the response
const port 	     = process.env.PORT || 8080;  // either any port or 8080 for localhost
var randomstring = require('randomstring');  
const register = require('./signup');       // including all the schemas and handlebars
const user = require('./userSchema');
const request = require('./reqSchema');
const admin = require('./admin');
const apply = require('./complaint');
const exphbs = require('express-handlebars');
app.use(express.static('public'));  // fetch all the static files/images fromm public folder
app.use( bodyParser.json() );  // we;ll use body parser to have json files
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({
    helpers: {
        ifEquals: function(arg1, arg2, options){
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        }
    }     // setting the extensi0on to be handlebars 
}));
app.set('view engine','handlebars');    

app.get('/', function(req,res){ 
    res.render('homepage');         // to show a webpage after a response
});

app.get('/homepage', function(req,res){
    res.render('homepage');
});

app.get('/signup', function (req, res) {
    res.render('signup');
})

app.get('/login', function(req,res){
    res.render('login');
});

app.get('/about', function(req,res){
    res.render('about');
});

app.get('/contact', function(req,res){
    res.render('contact');
});

app.get('/pickacomplaint', (req,res)=>{
    res.render('pickacomplaint');
});

app.get('/regcomplaint', (req,res)=>{
    res.render('regcomplaint');
});

app.get('/login', (req,res)=>{
    res.render('login');
});

app.get('/complainthistory', (req,res)=>{
    res.render('complainthistory');
});
app.get('/status',(req,res)=>{
    res.render('status');
})

app.post('/status', (req,res)=>{
    const email = req.body.email;
    console.log(email);
    request.find({email: email})
    .then(requests=>{
        res.render('status',{
            requests: requests
        });
    });
});

app.get('/adminlogin', (req,res)=>{
    res.render('admin_login');
});

app.get('/adminhome', (req,res)=>{
    res.render('admin_home');
});

app.get('/staffs',(req,res)=>{
    res.render('staffs');
});

app.get('/assigntask',(req,res)=>{
    res.render('assign_task');
});

app.get('/info',(req,res)=>{
    res.render('info');
});

app.get('/assign',(req,res)=>{
    res.render('assign');
});

app.post('/adminhome', (req,res)=>{
    request.find()
    .then(requests=>{
        res.render('admin_home',{
            requests: requests
        });
    });
});

app.post('/assigntask',(req,res)=>{
    request.find()
    .then(requests=>{
        res.render('assign_task',{
            requests: requests
        });
    });
});

app.post('/admin',(req,res)=>{
    const name = req.body.name;
    console.log(name);
    query = { "email" : "anantmishra20@gmail.com" };
    update = {"$set": { "btn": name } };
    options = { "multi": true };
    admin.update(query, update, options, function (err) {
    if (err) return console.error(err);         
    })
    res.redirect('/assign');
});

app.post('/assign', (req,res)=>{
    async function getDetails(){
        const id = await admin
        .find()
        .select({btn:1});
        console.log(id[0].btn);
        request.find({_id: id[0].btn})
            .then(requests=>{
                console.log(requests);
                res.render('assign',{
                    requests: requests
            });
        });
    }
    getDetails();
});

app.post('/statuschange', (req,res)=>{
    async function getDetails(){
        const id = await admin.find().select({btn:1});
        query = { "_id" : id[0].btn };
        update = {"$set": { "status": "Assigned" } };
        options = { "multi": true };
        request.update(query, update, options, function (err) {
        if (err) return console.error(err);         
        })
    }getDetails();
    res.redirect('/adminhome');
});

app.post('/adminlogin', (req,res)=>{
    const email = req.body.email;
    const password = req.body.pw;
    if(email=="anantmishra20@gmail.com" && password=="Anant@98"){
        res.redirect('/adminhome');
    } else{
        res.status(404).send("Admin Not Found");
    }
});

app.post('/signup', (req, res) => {
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
            res.setHeader('Location', '/userSchema'+regno);
            res.status(result.status).json({ message: result.message })
           })
        .catch(err => res.status(err.status).json({ message: err.message }));
        res.redirect('/login');
});

//Authenticating the User
app.post('/login', (req, res) => {
        async function checking(){
            const credentials = req.body.email;
            console.log(credentials);
            cred = await user.findOne({email:credentials},{email: 1 , _id:0});
            console.log(cred);
            if(cred==null){
                res.status(401).send("Email id not FOUND !");
            }
            else if (cred.email == credentials) {
                const pwd = req.body.pw;
                veri = await user.findOne({email: credentials, password: pwd },{password:1 , _id:0});
                if(veri==null){
                    res.status(401).send("The Password entered is incorrect!")
                }
                else if(veri.password == pwd){
                    var key = randomstring.generate();   
                        query = { "email" : credentials };
                        update = {
                            "$set": { "token": key } 
                        };
                        options = { "multi": true };

                        user.update(query, update, options, function (err) {
                            if (err) return console.error(err);         
                        })
                    res.redirect('/pickacomplaint');
                }
            }
        }
        checking();
});

app.post('/regcomplaint', (req,res)=>{
    const email = req.body.email;
    const issue = req.body.issue;
    const desc = req.body.desc;
    const time = req.body.time;
    const ttime = req.body.ttime;
    async function retrieval(){
        var cred = await user.findOne({email:email},{name: 1 ,reg:1, room:1, Block:1, phone:1, _id:0});
    apply.registerReq(issue, desc, time, ttime, cred.name, cred.reg, cred.room, cred.Block, cred.phone, email)
        .then(result => {
            res.redirect('/pickacomplaint');
           })
        .catch(err => res.status(err.status).json({ message: err.message }));
        } retrieval();
    });

app.listen(port);

console.log(`App Runs on ${port}`);