let jwt= require('jsonwebtoken')
let users= require('../models/users')

let getUserList=(req,resp)=>{
    let token= req.header('Authtoken')
    if(!token||token.length==0){
        resp.status(300).send("Auth token not sent")
    }else{
        try{
            let decoded_token= jwt.verify(token,'admin')
            console.log(decoded_token)
            users.find({},(err,result)=>{
                console.log(result)
                let newResult= result.map((el)=>{
                    return{
                        firstName: el.firstName,
                        lastName:el.lastName,
                        phoneNumber:el.phoneNumber,
                        email: el.email,
                        address:el.address,
                        id:el._id
                    }
                })
                resp.status(200).json(newResult)
            })
            console.log("USERSLIST")
        }catch(e){
            console.log(e)
        }
    }
}

module.exports=getUserList