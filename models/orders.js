var mongoose= require('mongoose')
var users=require('./users')


const orders=mongoose.model('orders',{
    client:{
        type:mongoose.Types.ObjectId,
        ref:users
    },
    products:Array,
    date:Date,
    status:String
})
module.exports= orders