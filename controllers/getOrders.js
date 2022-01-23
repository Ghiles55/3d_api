const { json } = require("body-parser");
let jwt = require("jsonwebtoken");
let orders = require("../models/orders");

let getOrders = (req, resp) => {
  let token = req.header("Authtoken");
  if (!token || token.length == 0) {
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
        const start = new Date(day);
        start.setHours(1, 0, 0, 0);
        const end = new Date(day);
        end.setHours(24, 59, 59, 999);

        orders.find({ date: { $gte: start, $lte: end } }, (err, result) => {
          if (err != null || result?.length == 0) {
            resp.status(300).send("No orders found in this time span");
          } else {
            resp.status(200).json({ orders: result });
          }
        });
      } else if (startDate instanceof Date && endDate instanceof Date) {
        startDate.setHours(1, 0, 0, 0);
        endDate.setHours(24, 59, 59, 999);
        orders.find(
          { date: { $gte: startDate, $lte: endDate } },
          (err, result) => {
            if (err != null || result?.length == 0) {
              resp.status(300).send("No orders found in this time span");
            } else {
              resp.status(200).json({ orders: result });
            }
          }
        );
      } else {
        orders.find({}, (err, result) => {
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
