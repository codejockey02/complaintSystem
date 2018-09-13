const express = require('express');
var app = express();
const bodyParser = require('body-parser');
var connect = require("connect");
const request = require('request');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

/* var bodyParser = require('body-parser')
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
}));
app.use(express.json());       
app.use(express.urlencoded());
app.set('view engine', 'ejs') */

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/userlogin')
    .then(()=> console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could Not Connect...",err));

app.get('/', function (req, res) {
    res.render('signup.ejs');
})
app.get('*', function(req, res) {
    res.render('error');
});
app.get('/login', function(req,res){
    res.render('login.ejs');
});
const userData = new mongoose.Schema({
    reg: String,
    name: String,
    password: String,
    gender: String,
    Block: String,
    room: Number,
    phone: Number,
    email: String
});
const loginSchema = new mongoose.Schema({
    name: String,
    password: String
});

const Data = mongoose.model('Data', userData);
const User = mongoose.model('User',loginSchema);

/* async function collection(){
    const data = new Data({
        reg: '16BCE0016',
        name: 'Priyesh',
        password: '1234',
        gender: 'M',
        Block: 'C',
        room: 420,
        phone: 9092266642,
        email: 'priyeshsaraswat9@gmail.com'
    })
    const result = await data.save();
} */

app.post('/login', (req, res) => {
    var myData = new Data({
        reg: req.body.regno,
        name: req.body.name,
        password: req.body.pwd,
        gender: req.body.gender,
        Block: req.body.Block,
        room: req.body.roomno,
        phone: req.body.pno,
        email: req.body.email
    })
    myData.save()
});

app.post('/info', (req, res) => {
    var myData = new User({
        name: req.body.email,
        password: req.body.pw
    })
    myData.save()
});

app.listen(3000, () => console.log('Listening on port 3000...'));