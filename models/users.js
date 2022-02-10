var mongoose= require('mongoose')

let users=mongoose.model('user',{
    firstName:String,
    lastName:String,
    email:String,
    address:String,
    region:String,
    phoneNumber:Number,
    password:String,
    registrationDate:Date
})

module.exports= users