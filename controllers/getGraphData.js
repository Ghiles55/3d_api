const res = require("express/lib/response");
let jwt = require("jsonwebtoken");
let orders = require("../models/orders");
let users= require('../models/users')

let getGraphData= (req,resp)=>{

    let token= req.header("Authtoken")
    if (!token || token.length == 0) {
        console.log(token);
        resp.status(300).send("Auth token not sent");
    }else{
        try{
            jwt.verify(token,'admin')
            let  januaryOrders, februaryOrders, marchOrders, aprilOrders, mayOrders, juneOrders,julyOrders, augustOrders, septemberOrders, octoberOrders,novemberOrders,decemberOrders
            let monthlyOrders= [ januaryOrders, februaryOrders, marchOrders, aprilOrders, mayOrders, juneOrders,julyOrders, augustOrders, septemberOrders, octoberOrders,novemberOrders,decemberOrders]
            monthlyOrders.map((el,idx)=>{
                let today= new Date
                let startDate= new Date(`${idx+1}/01/${today.getFullYear()}`)
                startDate.setHours(1,0,0,0)
                console.log(startDate, today)
              
            })
        }catch(e){
            console.log(e)
            resp.status(300).send(e)
        }
    }

}

module.exports= getGraphData