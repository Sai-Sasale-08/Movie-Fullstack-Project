const express = require("express")
const { createMovieController, deleteMovieController, updatemovie, getallmovies } = require("../controller/movieController")
const Auth = require("../middleware/Auth")
const MovieRouter=express.Router()

MovieRouter.use(Auth)
MovieRouter.post("/create",createMovieController)
MovieRouter.get("/allmovies",getallmovies)
MovieRouter.delete("/delete/:noteId",deleteMovieController)
MovieRouter.patch("/update/:noteId",updatemovie)



module.exports=MovieRouter