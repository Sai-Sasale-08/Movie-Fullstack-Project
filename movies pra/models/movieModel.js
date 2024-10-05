const mongoose=require("mongoose")

const movieSchema= new mongoose.Schema({
    title:String,
    genre:String,
    description:String,
    userId:String,
    release:Number,
    director:String
})

const movieModel=mongoose.model("movie",movieSchema)

module.exports=movieModel