
const movieModel = require("../models/movieModel")
const UserModel = require("../models/userModel")

const createMovieController=async (req,res)=>{

    const {title,genre,release,director,description}=req.body
    try {
        await movieModel.create({title,genre,release,director,description,userId:req.user?._id})
        res.status(200).json({message:"movie created"})
    } catch (error) {
        res.status(404).json({message:error})
    }
}

const deleteMovieController = async (req, res) => {
    const { noteId } = req.params;
    const userId = req.user?._id;
    if (!noteId) {
        return res.status(400).json({ message: "movie ID is required" });
    }
    try {
        const moviedata = await movieModel.findOne({ _id: noteId, userId: userId });
        if (!moviedata) {
            return res.status(404).json({ message: "movie not found" });
        }
        await movieModel.findByIdAndDelete(noteId);
        res.status(200).json({ message: "movie deleted successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });  
    }
};

const updatemovie=async(req,res)=>{
    const { noteId } = req.params;
    const userId = req.user?._id;
    if (!noteId) {
        return res.status(400).json({ message: "Note ID is required" });
    }
    try {
        const moviedata = await movieModel.findOne({ _id: noteId, userId: userId });
        if (!moviedata) {
            return res.status(404).json({ message: "movie not found" });
        }
        await movieModel.findByIdAndUpdate(noteId,{...req.body});
        res.status(200).json({ message: "movie updated successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });  
    }
}

const getallmovies=async(req,res)=>{
    const {_id}=req.user
    try {
        const moviedata=await movieModel.find({userId:_id})
        if(!moviedata || moviedata.length==0){
            return res.status(400).json({ message: "Note Not Found" });
        }
        res.status(200).json({message:"movie Fetched Successfully",moviedata});
    } catch (error) {
        return res.status(400).json({ message: error.message }); 
    }
}






module.exports={createMovieController,deleteMovieController,updatemovie,getallmovies}