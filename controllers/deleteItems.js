let jwt = require("jsonwebtoken");
let orders = require("../models/orders");
let users = require("../models/users");

let deleteitems = (req, resp) => {
  let token = req.header("Authtoken");
  let itemType = req.header("type");
  let itemsId = req.body.IDs;
console.log(itemsId, req.body)
  if (!token || token.length == 0) {
    console.log(token);
    resp.status(300).send("Auth token not sent");
  } else {
    try {
      jwt.verify(token, "admin");
      if (itemType == "orders") {
        orders.deleteMany({_id:{$in: itemsId}},(err,result)=>{
            if (err || result.length == 0) {
                console.log(err);
                resp.status(300).send("An error occured, please try again later");
              } else {
                console.log(result);
                resp.status(200).send("Items deleted successfully");
              }
        })
      } else if (itemType == "clients") {
        users.deleteMany({_id:{$in: itemsId}},(err,result)=>{
            if (err || result.length == 0) {
                console.log(err);
                resp.status(300).send("An error occured, please try again later");
              } else {
                console.log(result);
                resp.status(200).send("Items deleted successfully");
              }
        })
      }
    } catch (e) {}
  }
};

module.exports = deleteitems;
