let jwt= require('jsonwebtoken')
let orders= require('../models/orders')
let users= require('../models/users')

let order= (req,resp)=>{
    let token= req.header("Authtoken")
    let items= req.body.items
    console.log(req.body)
    if(!token || token.lenght== 0){
        resp.status(300).send("Token not sent")
        console.log(token)
    }else{
        try{
            let decoded_token= jwt.verify(token, "securepassword")
            let user_info= decoded_token.id
            let doc = new orders({
                client:user_info,
                products:items,
                date: Date(),
                status:'Pending'
            })
            doc.save()
            resp.status(200).json({status: "Order successfully registered"})
        }catch(e){
            console.log(e)
            resp.status(300).json({status: 'An error occured while registering, try again'})
        }
    }
}

module.exports=order