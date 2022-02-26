var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");;
var cors = require("cors");
var register=require('./controllers/register')
var Login=require('./controllers/login')
var getUser=require('./controllers/getUser')
var order= require('./controllers/order')
var getUserCount= require("./controllers/getUserCount")
var adminLogin= require('./controllers/adminLogin')
var getOrders = require('./controllers/getOrders')
var getUserList= require('./controllers/getUsersList')
var getOrderInfo= require('./controllers/getOrderInfo')
var getGraphData= require('./controllers/getGraphData')

var deleteItems= require("./controllers/deleteItems")

var multer= require('multer')
var path= require('path');


const storageEngine= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, "./uploads")
    },
    filename:(req,file,cb)=>{
        console.log(req.header("artId"))
        let artId= req.header('artId')
        cb(null,artId +'-' + file.fieldname + path.extname(file.originalname) )
    }
})

const upload= multer({ storage: storageEngine})

var app = express();

app.use(express.static("uploads"));
app.use(bodyParser());
app.use(cors())

app.post('/register',register)
app.post('/login',Login)
app.get("/getuser",getUser)
app.post('/order',order)
app.get("/userCount", getUserCount)
app.post("/adminlogin", adminLogin)
app.get('/getOrders', getOrders)
app.get("/getGraphData", getGraphData)
app.delete('/deleteItems', deleteItems)
app.get('/getuserlist', getUserList)
app.get('/orderInfo', getOrderInfo)
app.post('/uploadPrint', upload.fields([{
    name:'frontPrint',maxCount:1
},{
    name:'backPrint'
}
]),(req,res)=>{
    
    
    res.send('files uploades sucessfully')
})

mongoose
.connect(
    "mongodb+srv://Ghiles:Azerty54321@cluster0.7j48m.mongodb.net/test"
)
.then((db) => {
    console.log("Database connected");
})
.catch((err) => {
    console.log(err)
});

app.listen(950);
