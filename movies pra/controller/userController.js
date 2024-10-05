const UserModel = require("../models/userModel")
const dotenv=require("dotenv")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const otpGenerator = require('otp-generator')
const sendemail = require("../utilis/sendOtp")
const ejs=require("ejs")

dotenv.config()

const registrantionController=async(req,res)=>{
    const {name, email, password}=req.body
    const otp=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, digit: true, lowerCaseAlphabets: false });
    const verificationToken=jwt.sign({name, email, password, otpG:otp},process.env.privetkey);
    console.log(otp,verificationToken);
    
    try {
        const htmltemplate=await ejs.renderFile(__dirname+"/../view/email.ejs",{otp,name})
        await sendemail(email,htmltemplate)
        res.cookie("verification_Token",verificationToken)
        .status(200).json({message:"Email send successfully verify your otp"})
    } catch (error) {
        res.status(404).json({message:error})
    }

   
}


const verifyController=async(req,res)=>{
        const {otp}=req.body;
        const verificationtoken = req?.cookies?.verification_Token;
        if (!verificationtoken) {
            return res.status(400).json({ message: "Verification token not found" });
        } 
        const {name,email,password,otpG} = jwt.verify(verificationtoken,process.env.privetkey);
        console.log(otpG)

        if(otpG!=otp){
            return res.status(404).json({message:"Involid OTP"})
        }else{
            bcrypt.hash(password,5,async function(err,hash){
                if(err){
                    res.status(404).json({message:err})
                }else{
                    await UserModel.create({name,email,password:hash})
                    res.status(200).json({message:"User Created Successfully"})
                }
            })
        }
}


const loginController=async(req,res)=>{
    const {email,password}=req.body;
    const user=await UserModel.findOne({email})
    if(!user){
        return res.status(400).json({ message: "User Not Found" });
    }
    bcrypt.compare(password,user.password,function(err,result){
        if(err){
            return res.status(400).json({ message:err });
        }else{
            if(result){
                const access_token=jwt.sign({email},process.env.privetkey);
                res.cookie("acess_token",access_token).status(200).json({message:"User Login SuccessFuully"})
            }
        }
    })
}



module.exports={registrantionController,verifyController,loginController}