var jwt= require('jsonwebtoken')
var users= require('../models/users')

let getUser=(req,resp)=>{
    let token= req.header('Authtoken')
    if(!token||token.length==0){
        resp.status(300).send("Auth token not sent")
    }else{
        try{
            let decoded_token= jwt.verify(token,'securepassword')
            console.log(decoded_token)
            users.find({_id:decoded_token.id},(err,result)=>{
                console.log(result)
                if(err==null||result.length>0){
                    let res=result[0]
                    let user={
                        firstName:res.firstName,
                        lastName:res.lastName,
                        address:res.address,
                        phoneNumber:res.phoneNumber,
                        region:res.region,
                        email:res.email
                    }
                    resp.status(200).json(user)
                }
            })
        }catch(e){
            console.log(e)
            resp.status(300).send('Auth token not valid')
        }
    }
}
module.exports= getUser