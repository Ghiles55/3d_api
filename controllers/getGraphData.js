let fns= require('date-fns')
let jwt = require("jsonwebtoken");
let orders = require("../models/orders");
let users= require('../models/users')

let getGraphData= (req,resp)=>{

    let token= req.header("Authtoken")
    let year= req.header('year')
    if (!token || token.length == 0) {
        console.log(token);
        resp.status(300).send("Auth token not sent");
    }else{
        try{
            jwt.verify(token,'admin')
            let ordersData=[]
            for(let i=0; i < 12; i++){

                // let startDay= fns.format(new Date(01,i,Number(year)), "dd-mm-yyyy")
                // let endDay= fns.lastDayOfMonth(new Date(startDay))
                // let startDay= fns.format(new Date(2022 ,4, 08), "dd/MM/yyyy")
                let startDay= fns.format(new Date(2022, i, 01), "yyyy/MM/dd")
                let endDay= fns.format(fns.lastDayOfMonth(new Date(startDay)), "yyyy/MM/dd")
               console.log(startDay , startDay instanceof Date, endDay)
               orders.find({date: { $gte: startDay , $lte: endDay}},(err, result)=>{
                   if(err!=null){
                       console.log(err)
                   }else{
                       let ordersNumber= result.length
                       ordersData.push(ordersNumber)
                       console.log(ordersNumber, ordersData)
                       if(i==11){
                        console.log(ordersData)
                        resp.status(200).json({ ordersByMonth: ordersData})
                       }
                    }
               })
               
            }
           
            // let  januaryOrders, februaryOrders, marchOrders, aprilOrders, mayOrders, juneOrders,julyOrders, augustOrders, septemberOrders, octoberOrders,novemberOrders,decemberOrders
            // let monthlyOrders= [ januaryOrders, februaryOrders, marchOrders, aprilOrders, mayOrders, juneOrders,julyOrders, augustOrders, septemberOrders, octoberOrders,novemberOrders,decemberOrders]
            // monthlyOrders.map((el,idx)=>{
            //     let today= new Date
            //     let startDate= new Date(`${idx+1}/01/${today.getFullYear()}`)
            //     startDate.setHours(1,0,0,0)
            //     console.log(startDate, today)
              
            // })

        }catch(e){
            console.log(e)
            resp.status(300).send(e)
        }
    }

}

module.exports= getGraphData