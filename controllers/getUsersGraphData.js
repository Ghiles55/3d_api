let fns = require("date-fns");
let jwt = require("jsonwebtoken");
let users = require("../models/users");

let getUsersData= (req, resp)=>{
    let token = req.header("Authtoken");
    let year = req.header("year");
    if (!token || token.length == 0) {
        console.log(token);
        resp.status(300).send("Auth token not sent");
    }else{
        try{
            jwt.verify(token, "admin");
            let usersData = [];
            for (let i = 0; i < 12; i++) {
                let startDay = fns.format(new Date(year, i, 01), "yyyy/MM/dd");
                let endDay = fns.format(
                  fns.lastDayOfMonth(new Date(startDay)),
                  "yyyy/MM/dd"
                )
                users.find(
                    { registrationDate: { $gte: startDay, $lte: endDay } },
                    (err, result) => {
                      if (err != null) {
                        console.log(err);
                      } else {
                        let usersNumber = result.length;
                        usersData.push(usersNumber);
                        if (i == 11) {
                          
                          resp
                            .status(200)
                            .json({ usersByMonth: usersData });
                        }
                        console.log(usersNumber, usersData);
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

module.exports= getUsersData