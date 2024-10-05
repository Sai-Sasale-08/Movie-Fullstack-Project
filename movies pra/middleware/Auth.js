const jwt = require("jsonwebtoken")
const UserModel = require("../models/userModel")


const Auth=(req,res,next)=>{
    const Access_Token=req.cookies.acess_token
    if(!Access_Token)
    {
        return res.status(404).json({message:"Please Login To Create Note"})
    }
    jwt.verify(Access_Token,process.env.privetkey,async function(err,decoded){
            if(err){
                return res.status(404).json({message:"Involid Token"})
            }else{
                const {email}= decoded
                const user =await UserModel.findOne({email})
                req.user=user
                next()
            }
    })
}

module.exports=Auth