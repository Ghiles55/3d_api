let jwt = require("jsonwebtoken");


const adminLogin =async (req,resp)=>{
    let user= req.body.user || ""
    let password = req.body.Password|| ""
    console.log(req.body)
    if(user=="admin55"||password=="admin55"){
        let tokendata={
            user:"admin",
            pass:'admin'
        }
       let token= jwt.sign(tokendata,"admin")
        resp.status(200).json({token: token})
    }else{
        resp.status(300).send("An error occured while logging in")
    }
}

module.exports= adminLogin