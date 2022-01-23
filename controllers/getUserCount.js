var users = require("../models/users");
var jwt = require("jsonwebtoken");


let getUserCount = (req, resp) => {
  let token = req.header("Authtoken");
  if (!token || token.length == 0) {
    resp.status(300).send("Auth token not sent");
  } else {
    try {
      let decoded_token = jwt.verify(token, "admin");
      users.find({}, (err, result) => {
        if (err == null || result.length > 0) {
          let usersCount = result.length;
          resp.status(200).json({ userCount: usersCount });
        }
      });
    } catch (e) {
      console.log(e);
      resp.status(300).send("An error occured, try again later");
    }
  }
};

module.exports = getUserCount;
