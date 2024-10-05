const nodemailer = require("nodemailer")
const dotenv=require("dotenv")
dotenv.config();

const sendemail=async(email,htmltemplate)=>{
    const transporter = nodemailer.createTransport({
        
        service:"gmail",
        auth: {
          user:process.env.HostEmail,
          pass:process.env.HostPassword,
        },
      });
      try {
        const info = await transporter.sendMail({
            from: process.env.HostEmail, // sender address
            to: email, // list of receivers
            subject: "Verification", // Subject line
            text: htmltemplate, // plain text body
            
          });
          
        console.log("OTP Send SuccessFully");
      } catch (error) {
        console.log(error)
      }
}


module.exports=sendemail