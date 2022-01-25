const { json } = require("body-parser");
let jwt = require("jsonwebtoken");
let orders = require("../models/orders");

let getOrders = (req, resp) => {
  console.log("AAAAAAAAAAA")
  let token = req.header("Authtoken");
  console.log(token)
  let orderId = req.header("ID");
  if (!token || token.length == 0) {
    console.log(token)
    resp.status(300).send("Auth token not sent");
  } else {
    try {
      jwt.verify(token, "admin");
      let startDate, endDate;
      let day = req.query.day;
      if (req.query.start && req.query.end) {
        startDate = new Date(req.query.start);
        endDate = new Date(req.query.end);
      }

      if (day) {
        console.log("IN DAY BLOCK")
        const start = new Date(day);
        start.setHours(1, 0, 0, 0);
        const end = new Date(day);
        end.setHours(24, 59, 59, 999);
        orders
          .find({ date: { $gte: start, $lte: end } })
          .populate("client", "firstName lastName phoneNumber email")
          .exec((err, result) => {
            console.log(err);
            if (err != null || result?.length == 0) {
              resp.status(301).send("No orders found in this time span");
            } else {
              resp.status(200).json({ orders: result });
            }
          });
      } else if (startDate instanceof Date && endDate instanceof Date) {
        console.log("IN else if BLOCK")
        startDate.setHours(1, 0, 0, 0);
        endDate.setHours(24, 59, 59, 999);
        orders
          .find({ date: { $gte: startDate, $lte: endDate } })
          .populate("client", "firstName lastName phoneNumber email")
          .exec((err, result) => {
            if (err != null || result?.length == 0) {
              resp.status(301).send("No orders found in this time span");
            } else {
              resp.status(200).json({ orders: result });
            }
          });
      } 
      // else if (orderId!=null && orderId.length != 0 && orderId!= undefined) {
      //   console.log("IN ID BLOCK")
      //   orders
      //     .find({ _id: orderId })
      //     .populate("client", "firstName lastName phoneNumber email")
      //     .exec((err, result) => {
      //       if (err != null || result?.length == 0) {
      //         resp.status(301).send("No orders found with this ID");
      //       } else {
      //         resp.status(200).json({ orders: result });
      //       }
      //     });
       else {
        console.log("IN ELSE BLOCK")
        orders
          .find({})
          .populate("client", "firstName lastName phoneNumber email")
          .exec((err, result) => {
            resp.status(200).json({ orders: result });
          });
      }
    } catch (e) {
      console.log(e);
      resp
        .status(300)
        .send("An error occured when fetching the orders, please try again");
    }
  }
};

module.exports = getOrders;
