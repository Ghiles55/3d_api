let users = require('../models/users');

let signup = async(req,res)=>{
    console.log(users);
    let firstName= req.body.firstName;
    let lastName=req.body.lastName
    let password=req.body.Password;
    let email= req.body.email
    let phoneNumber=req.body.PhoneNumber
    let address= req.body.Address
    let region=req.body.region
    let location={
        address,
        region
    }

    users.find({email:email},async(err,resultat)=>{
        if(err==null && resultat.length>0 ){
            console.log(resultat)
            res.status(300).json({status:"This account already exists!"});
        }else {
            try {
                let doc=new users({
                    firstName:firstName,
                    lastName:lastName,
                    password:password,
                    email:email,
                    phoneNumber:phoneNumber,
                   address:address,
                   region:region
                });
                console.log(doc)
                await doc.save();
                res.status(200).json({status:"User signed up successfully "});
            }catch(err){
            res.status(300).json({status:"An error occured while registering, please try again"});
            }
        }
    });
};


module.exports = signup;