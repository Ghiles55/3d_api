const { json } = require("body-parser");
let jwt = require("jsonwebtoken");
let orders = require("../models/orders");

let getOrderInfo = (req, resp) => {
  let token = req.header("Authtoken");
  let orderId = req.header("ID");
  console.log("AAAAAAAAAA",orderId)
  if (!token || token.length == 0) {
    console.log(token);
    resp.status(300).send("Auth token not sent");
  } else {
    try {
      jwt.verify(token, "admin");
      if (orderId != null && orderId.length != 0 && orderId != undefined) {
        console.log("IN ID BLOCK");
        orders
          .find({ _id: orderId })
          .populate("client", "firstName lastName phoneNumber email")
          .exec((err, result) => {
            if (err != null || result?.length == 0) {
                console.log("IN ERROR", result, err)
              resp.status(301).send("No orders found with this ID");
            } else {
              let newResult= {...result[0]}
              let test= result[0].products.map((el)=>{
                let artId= el.id
                el.frontPrint.image= `\\uploads\\${artId}-frontPrint.png`
                el.backPrint.image= `\\uploads\\${artId}-backPrint.png`
              })
              console.log(newResult, test)
              resp.status(200).json({ orders: result });
            }
          });
      }
    } catch (e) {
        console.log(e)
        resp.status(300).send("An error occured, please try again later")
    }
  }
};

module.exports= getOrderInfo