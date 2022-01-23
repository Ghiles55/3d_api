let jwt = require("jsonwebtoken");
let users= require('../models/users')

const Login =async (req,resp)=>{
    let email= req.body.email || ""
    let password = req.body.Password|| ""
    console.log(req.body)
    users.find({email: email , password: password},(err,users)=>{
        console.log(err==null && users.length >0)
        if(err==null && users.length >0){
            console.log("in if block")
            let seller= users[0]
            let tokendata={
                id: seller._id,
                email: seller.email,
            }
            let token= jwt.sign(tokendata, "securepassword");
            console.log(token)
            resp.status(200).json({
                status:'success',
                token: token
            })
        }else{
            resp.status(300).json({satus:"failed to login"})
        }
    })
}

module.exports= Login