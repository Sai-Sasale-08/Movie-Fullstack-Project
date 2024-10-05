const express=require("express")
const { registrantionController, verifyController, loginController } = require("../controller/userController")
const UserRouter=express.Router()

UserRouter.post("/register",registrantionController)
UserRouter.post("/verification",verifyController)
UserRouter.post("/login",loginController)


module.exports=UserRouter