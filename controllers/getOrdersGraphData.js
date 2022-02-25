let fns = require("date-fns");
let jwt = require("jsonwebtoken");
let orders = require("../models/orders");

let getOrdersData= async(req,resp)=>{
    let token = req.header("Authtoken");
    let year = req.header("year");
    if (!token || token.length == 0) {
        console.log(token);
        resp.status(300).send("Auth token not sent");
    }else{
        try{
            jwt.verify(token, "admin");
            let ordersData = [];
            for (let i = 0; i < 12; i++) {
                let startDay = fns.format(new Date(year, i, 01), "yyyy/MM/dd");
                let endDay = fns.format(
                  fns.lastDayOfMonth(new Date(startDay)),
                  "yyyy/MM/dd"
                );
                orders.find(
                    { date: { $gte: startDay, $lte: endDay } },
                    (err, result) => {
                      if (err != null) {
                        console.log(err);
                      } else {
                        let ordersNumber = result.length;
                        ordersData.push(ordersNumber);
                        if (i >= 11) {
                            console.log(ordersData);
                            resp
                              .status(200)
                              .json({ ordersByMonth: ordersData });
                              ordersData=[]
                              
                          }
                      }
                    }
                  );
            }
        }catch(e){
            console.log(e);
            resp.status(300).send(e);
        }
    }
}

module.exports= getOrdersData