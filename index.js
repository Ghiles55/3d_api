var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");;
var jwt = require("jsonwebtoken");
var cors = require("cors");
var register=require('./controllers/register')
var Login=require('./controllers/login')
var getUser=require('./controllers/getUser')
var order= require('./controllers/order')
var getUserCount= require("./controllers/getUserCount")
var adminLogin= require('./controllers/adminLogin')
var getOrders = require('./controllers/getOrders')
var getUserList= require('./controllers/getUsersList')
var app = express();
app.use(bodyParser());
app.use(cors());

app.post('/register',register)
app.post('/login',Login)
app.get("/getuser",getUser)
app.post('/order',order)
app.get("/userCount", getUserCount)
app.get("/adminlogin", adminLogin)
app.get('/getOrders', getOrders)
app.get('/getuserlist', getUserList)

mongoose
.connect(
    "mongodb+srv://Ghiles:Azerty54321@cluster0.7j48m.mongodb.net/test"
)
.then((db) => {
    console.log("Database connected");
})
.catch((err) => {});

app.listen(780);
